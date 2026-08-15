/**
 * seed.js — Duplicate-safe CommonJS seeder for BusTicketBoking.
 *
 * Uses stdlib, no dotenv/mongoose when run with --dry-run.
 * In live mode, connects, upserts via bulkWrite, disconnects.
 *
 * Rerun semantics:
 *  - Buses: upsert by composite key (busName + busWay + departureDate + departureTime).
 *           On match, updates route/timing/price/boarding/dropping/busName but
 *           preserves booking-mutated fields (seatsAvailable, ticketId, bookedSeats)
 *           via $setOnInsert.
 *  - Coupons: upsert by code. Preserves usedBy and usageLimit.
 */

"use strict";

const DRY_RUN = process.argv.includes("--dry-run");

// ─── stdlib-only date range ──────────────────────────────────────────────────

function dateRange(startStr, endStr) {
  const dates = [];
  const cur = new Date(startStr + "T00:00:00Z");
  const end = new Date(endStr + "T00:00:00Z");
  while (cur <= end) {
    dates.push(cur.toISOString().split("T")[0]);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

// ─── Deterministic schedule data ─────────────────────────────────────────────

const ROUTES = [
  { from: "Dhaka",        to: "Chittagong",  boarding: "Kalyanpur",      dropping: "Oxygen More",    time: "06:00 AM",  dur: "5h 30m", price: 850  },
  { from: "Dhaka",        to: "Chittagong",  boarding: "Fakirapool",     dropping: "Camp",           time: "09:30 AM",  dur: "5h 45m", price: 900  },
  { from: "Dhaka",        to: "Sylhet",      boarding: "Mohammadpur",    dropping: "Kadomtoli",      time: "07:00 AM",  dur: "6h 00m", price: 750  },
  { from: "Dhaka",        to: "Sylhet",      boarding: "Saydabad",       dropping: "Ambarkhana",     time: "10:00 PM",  dur: "6h 15m", price: 800  },
  { from: "Dhaka",        to: "Rajshahi",    boarding: "Gabtoli",        dropping: "Sahid Boro",     time: "08:00 AM",  dur: "5h 00m", price: 700  },
  { from: "Dhaka",        to: "Khulna",      boarding: "Cantt Rail",     dropping: "Sonadanga",      time: "07:30 AM",  dur: "4h 30m", price: 650  },
  { from: "Chittagong",   to: "Dhaka",       boarding: "Oxygen More",   dropping: "Kalyanpur",      time: "06:30 AM",  dur: "5h 30m", price: 850  },
  { from: "Chittagong",   to: "Dhaka",       boarding: "Camp",          dropping: "Fakirapool",     time: "10:00 PM",  dur: "5h 45m", price: 900  },
  { from: "Sylhet",       to: "Dhaka",       boarding: "Kadomtoli",     dropping: "Mohammadpur",    time: "07:30 AM",  dur: "6h 00m", price: 750  },
  { from: "Rajshahi",     to: "Dhaka",       boarding: "Sahid Boro",    dropping: "Gabtoli",        time: "08:30 AM",  dur: "5h 00m", price: 700  },
  { from: "Khulna",       to: "Dhaka",       boarding: "Sonadanga",     dropping: "Cantt Rail",     time: "09:00 AM",  dur: "4h 30m", price: 650  },
  { from: "Dhaka",        to: "Cox's Bazar", boarding: "Saydabad",     dropping: "Cox Bazar Bus",  time: "10:00 PM",  dur: "9h 00m", price: 1200 },
  { from: "Cox's Bazar",  to: "Dhaka",       boarding: "Cox Bazar Bus",dropping: "Saydabad",       time: "09:00 PM",  dur: "9h 00m", price: 1200 },
  { from: "Dhaka",        to: "Barisal",      boarding: "Gabtoli",      dropping: "Rupatoli",       time: "07:00 AM",  dur: "3h 30m", price: 500  },
  { from: "Barisal",      to: "Dhaka",       boarding: "Rupatoli",     dropping: "Gabtoli",        time: "02:00 PM",  dur: "3h 30m", price: 500  },
];

const BUS_NAMES = [
  "Talha Paribahan",
  "Green Line",
  "Shyamoli Express",
  "Hanif Enterprise",
  "Soudia Coach",
];

function buildSchedule() {
  const dates = dateRange("2026-08-16", "2026-10-15");
  const out = [];
  for (const date of dates) {
    const dateNum = parseInt(date.replace(/-/g, ""), 10);
    for (const route of ROUTES) {
      const routeIdx = ROUTES.indexOf(route);
      const nameIdx = (routeIdx * 7 + dateNum) % BUS_NAMES.length;
      out.push({
        busName: BUS_NAMES[nameIdx],
        busWay: `${route.from}-${route.to}`,
        departureDate: date,
        departureTime: route.time,
        timeRequired: route.dur,
        ticketPrice: route.price,
        boardingPoint: route.boarding,
        droppingPoint: route.dropping,
      });
    }
  }
  return out;
}

// ─── Coupon definitions ──────────────────────────────────────────────────────

const COUPONS = [
  { code: "NEW15",    discountPercentage: "15", expirationDate: new Date("2026-10-31T23:59:59Z"), minPurchaseAmount: 500, usageLimit: 100, isActive: true },
  { code: "Couple20", discountPercentage: "20", expirationDate: new Date("2026-10-31T23:59:59Z"), minPurchaseAmount: 800, usageLimit: 50,  isActive: true },
];

// ─── Validation helpers (stdlib, no model load) ──────────────────────────────

function validateSchedule(schedule) {
  const seen = new Set();
  for (const entry of schedule) {
    const key = `${entry.busName}|${entry.busWay}|${entry.departureDate}|${entry.departureTime}`;
    if (seen.has(key)) console.warn(`  ⚠ Duplicate schedule key: ${key}`);
    seen.add(key);
  }
  console.log(`  Schedule entries: ${schedule.length} (unique: ${seen.size})`);
  console.log(`  First schedule date: ${schedule[0].departureDate}`);
  console.log(`  Last schedule date: ${schedule[schedule.length-1].departureDate}`);
  if (schedule[0].departureDate !== "2026-08-16" || schedule[schedule.length-1].departureDate !== "2026-10-15") {
      throw new Error("Date assertion failed!");
  }
}

function printCoupons() {
  for (const c of COUPONS) {
    console.log(`    ${c.code} → ${c.discountPercentage}% off, expires ${c.expirationDate.toISOString()}`);
  }
}

// ─── Live seeder: requires mongoose/connections inside live branch ───────────

async function runLive() {
  require("dotenv").config();
  const mongoose = require("mongoose");
  const availableBusModel = require("./models/availableBusModel");
  const couponModel = require("./models/discountCouponModel");

  if (!process.env.MONGODB_URI) {
    console.error("ERROR: MONGODB_URI is not set.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected\n");

  const schedule = buildSchedule();
  console.log(`  Schedule entries: ${schedule.length}`);

  const busOps = schedule.map((s) => ({
    updateOne: {
      filter: { busName: s.busName, busWay: s.busWay, departureDate: s.departureDate, departureTime: s.departureTime },
      update: {
        $set: {
          ticketPrice: s.ticketPrice,
          timeRequired: s.timeRequired,
          boardingPoint: s.boardingPoint,
          droppingPoint: s.droppingPoint,
          busName: s.busName,
        },
        $setOnInsert: { seatsAvailable: 45, ticketId: [], bookedSeats: [] },
      },
      upsert: true,
    },
  }));
  const busResult = await availableBusModel.bulkWrite(busOps, { ordered: false });
  console.log(`  Buses upserted: ${busResult.upsertedCount}, modified: ${busResult.modifiedCount}`);

  const couponOps = COUPONS.map((c) => ({
    updateOne: {
      filter: { code: c.code },
      update: {
        $set: {
          discountPercentage: c.discountPercentage,
          expirationDate: c.expirationDate,
          minPurchaseAmount: c.minPurchaseAmount,
          isActive: c.isActive,
        },
        $setOnInsert: { code: c.code, usedBy: [], usageLimit: c.usageLimit },
      },
      upsert: true,
    },
  }));
  const couponResult = await couponModel.bulkWrite(couponOps, { ordered: false });
  console.log(`  Coupons upserted: ${couponResult.upsertedCount}, modified: ${couponResult.modifiedCount}`);

  console.log("\n✅ Seeding complete.");
  await mongoose.disconnect();
  console.log("Disconnected.");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) {
    console.log("🌱 DRY RUN — no writes, no model/DB load\n");
    validateSchedule(buildSchedule());
    console.log(`  Coupon definitions: ${COUPONS.length}`);
    printCoupons();
    console.log("\n✅ Dry-run validation complete.");
    return;
  }
  console.log("🌱 SEEDING — live run\n");
  try {
    await runLive();
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

main();