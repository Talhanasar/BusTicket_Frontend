const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const customerModel = require("../models/customerModel");
const availableModel = require("../models/availableBusModel");
const couponModel = require("../models/discountCouponModel");
const validate = require("../middleware/validate-middleware");
const seatBookingSchema = require("../validator/customerValidator");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isReplSetRequiredError(err) {
  const msg = (err && (err.message || String(err))) || "";
  return /Transaction numbers are only allowed on a replica set member or mongos/i.test(msg)
      || /not supported in standalone/i.test(msg)
      || /\bstandalone\b.*\btransaction/i.test(msg);
}

function normalizeSeat(s) {
  return typeof s === "string" ? s.trim().toUpperCase() : "";
}

// ─── List endpoints (unchanged contract) ─────────────────────────────────────

router.get("/:busId", async (req, res) => {
  try {
    const data = await customerModel.find({ busId: req.params.busId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await customerModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Booking endpoint ─────────────────────────────────────────────────────────
//
// Contract preserved for SubmitFunction.jsx:
//   success → 201 { message: "Booking done Successfully!" }
//   failure → 4xx/5xx { message, code }
//
// Concurrency model: `availableBus.bookedSeats` is the atomic reservation
// ledger. Reservation is a single conditional update:
//   filter : { _id, seatsAvailable: { $gte }, bookedSeats: { $nin } }
//   update : { $addToSet bookedSeats, $inc seatsAvailable }
//
// Limitation (explicit): legacy buses (no bookedSeats populated) still have
// to rely on the JS-level overlap check derived from populated ticketId.
// The booking route atomically backfills bookedSeats from ticketId on first
// reservation, so the safety guarantee converges once the next reservation
// occurs. Replica set deployments enable the transaction path below for
// multi-doc atomicity (customer + bus + coupon). If transactions are not
// supported, returns 503 to keep safety guarantees.

router.post("/", validate(seatBookingSchema), async (req, res) => {
  let { busId, seatBooked, name, phone, email = "", couponUsed = null, totalMoney } = req.body;

  // 1. Normalize & reject duplicates / empties
  seatBooked = Array.isArray(seatBooked) ? seatBooked.map(normalizeSeat).filter(Boolean) : [];
  if (seatBooked.length === 0) {
    return res.status(400).json({ message: "No valid seats provided", code: "EMPTY_SEATS" });
  }
  if (new Set(seatBooked).size !== seatBooked.length) {
    return res.status(400).json({ message: "Duplicate seat IDs in request", code: "DUPLICATE_SEATS" });
  }

  try {
    // 2. Load bus (with booking history)
    const bus = await availableModel.findById(busId).populate("ticketId", "seatBooked");
    if (!bus) return res.status(404).json({ message: "Bus not found", code: "BUS_NOT_FOUND" });

    // 2a. Derive already-booked seats from booking history (legacy safe).
    // The atomic `bookedSeats` field may be empty for pre-feature buses.
    const legacyBooked = (bus.ticketId || []).flatMap((c) => c.seatBooked || []);
    const knownBooked = new Set([...(bus.bookedSeats || []), ...legacyBooked]);
    const overlap = seatBooked.filter((s) => knownBooked.has(s));
    if (overlap.length > 0) {
      return res.status(409).json({
        message: `Seats already booked: ${overlap.join(", ")}`,
        code: "SEAT_TAKEN",
      });
    }

    // 2b. Pre-discount purchase threshold computed from authoritative price.
    const preDiscountTotal = Number(bus.ticketPrice) * seatBooked.length;

    // 3. Coupon pre-check
    let coupon = null;
    if (couponUsed) {
      coupon = await couponModel.findById(couponUsed);
      if (!coupon) return res.status(400).json({ message: "Invalid coupon", code: "INVALID_COUPON" });
      if (!coupon.isActive) return res.status(400).json({ message: "Coupon inactive", code: "COUPON_INACTIVE" });
      if (coupon.expirationDate && new Date(coupon.expirationDate) < new Date()) {
        return res.status(400).json({ message: "Coupon expired", code: "COUPON_EXPIRED" });
      }
      if ((coupon.usageLimit ?? 0) <= 0) {
        return res.status(409).json({ message: "Coupon usage limit reached", code: "COUPON_EXHAUSTED" });
      }
      if (preDiscountTotal < Number(coupon.minPurchaseAmount || 0)) {
        return res.status(400).json({
          message: `Coupon requires minimum purchase of ${coupon.minPurchaseAmount}`,
          code: "COUPON_MIN_PURCHASE",
        });
      }
    }

    // 4. Instantiate customer early so we have an _id for ticketId + usedBy.
    // Persistence is deferred until after reservation conditions pass.
    const customerDoc = new customerModel({
      busId,
      seatBooked,
      name,
      phone,
      email,
      couponUsed: coupon ? coupon._id : undefined,
      totalMoney,
    });
    const customerId = customerDoc._id;

    // 5. Backfill bookedSeats on legacy buses (set union with existing).
    // Uses $addToSet with $each so we don't overwrite concurrent reservations.
    if (!bus.bookedSeats || bus.bookedSeats.length === 0) {
      const legacyUnion = Array.from(new Set([...legacyBooked]));
      if (legacyUnion.length > 0) {
        try {
          await availableModel.updateOne(
            { _id: busId, bookedSeats: { $size: 0 } },
            { $addToSet: { bookedSeats: { $each: legacyUnion } } }
          );
        } catch (e) {
          // Backfill is best-effort; if it fails the atomic step still protects the new seats.
          console.error("bookedSeats backfill warning:", e.message);
        }
      }
    }

    // 6. Transaction-only path with replica-set requirement enforcement.
    const session = await mongoose.startSession();
    let useTxn = true;
    try {
      session.startTransaction();
    } catch (e) {
      if (isReplSetRequiredError(e)) useTxn = false;
      else { session.endSession(); throw e; }
    }

    if (useTxn) {
      try {
        const busUpdate = await availableModel.findOneAndUpdate(
          { _id: busId, seatsAvailable: { $gte: seatBooked.length }, bookedSeats: { $nin: seatBooked } },
          {
            $addToSet: { bookedSeats: { $each: seatBooked } },
            $inc: { seatsAvailable: -seatBooked.length },
          },
          { session, new: true }
        );
        if (!busUpdate) {
          await session.abortTransaction();
          session.endSession();
          return res.status(409).json({ message: "Seats no longer available", code: "SEAT_TAKEN" });
        }

        if (coupon) {
          const couponUpdate = await couponModel.findOneAndUpdate(
            {
              _id: coupon._id,
              isActive: true,
              expirationDate: { $gt: new Date() },
              usageLimit: { $gt: 0 },
            },
            {
              $inc: { usageLimit: -1 },
              $addToSet: { usedBy: customerId },
            },
            { session, new: true }
          );
          if (!couponUpdate) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).json({ message: "Coupon no longer available", code: "COUPON_EXHAUSTED" });
          }
        }

        await customerDoc.save({ session });
        await availableModel.findByIdAndUpdate(
          busId,
          { $push: { ticketId: customerId } },
          { session }
        );

        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({ message: "Booking done Successfully!" });
      } catch (err) {
        try { await session.abortTransaction(); } catch (_) {}
        session.endSession();
        if (!isReplSetRequiredError(err)) throw err;
        // Transaction not supported - return 503
        return res.status(503).json({ message: "Booking requires a replica-set database for atomic operations" });
      }
    } else {
      // Replica-set required but transaction failed
      session.endSession();
      return res.status(503).json({ message: "Booking requires a replica-set database for atomic operations" });
    }
  } catch (err) {
    console.error("Booking error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

async function rollbackBus(busId, seatBooked) {
  try {
    await availableModel.updateOne(
      { _id: busId },
      {
        $pull: { bookedSeats: { $in: seatBooked } },
        $inc: { seatsAvailable: seatBooked.length },
      }
    );
  } catch (e) {
    console.error("Bus rollback failure:", e.message);
  }
}

async function rollbackCoupon(couponId, customerId) {
  try {
    await couponModel.updateOne(
      { _id: couponId },
      {
        $inc: { usageLimit: 1 },
        $pull: { usedBy: customerId },
      }
    );
  } catch (e) {
    console.error("Coupon rollback failure:", e.message);
  }
}

async function rollbackBus(busId, seatBooked) {
  try {
    await availableModel.updateOne(
      { _id: busId },
      {
        $pull: { bookedSeats: { $in: seatBooked } },
        $inc: { seatsAvailable: seatBooked.length },
      }
    );
  } catch (e) {
    console.error("Bus rollback failure:", e.message);
  }
}

async function rollbackCoupon(couponId, customerId) {
  try {
    await couponModel.updateOne(
      { _id: couponId },
      {
        $inc: { usageLimit: 1 },
        $pull: { usedBy: customerId },
      }
    );
  } catch (e) {
    console.error("Coupon rollback failure:", e.message);
  }
}

module.exports = router;