const express = require("express");
const router = express.Router();
const availableModel = require("../models/availableBusModel");

function capitalizeWords(str) {
  // Title-case every word within each hyphen-separated segment,
  // preserving apostrophes (e.g. "Cox's Bazar" not "Cox'S Bazar").
  return str
    .split('-')
    .map(segment =>
      segment
        .split(/\s+/)
        .filter(Boolean)
        .map(w =>
          w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join(' ')
    )
    .join('-');
}

// Parse `busWay` and `departureDate` from the encoded route/date string.
// The frontend constructs this as:
//   way=<from>-<to>%20date=<YYYY-MM-DD>
// where %20 is the space between the way and date segments.
// Because city names may contain spaces / apostrophes (e.g. "Cox's Bazar"),
// we split on " date=" AFTER decoding, then strip the leading "way=".
function parseWayDate(details) {
  // URL-decode + replace escape sequences so "Cox%27s%20Bazar" becomes "Cox's Bazar"
  const decoded = decodeURIComponent(details)
    .replace(/%20/g, " ")
    .trim();
  // Find split between "way=..." and "date=..."
  const m = decoded.match(/^way=(.+?)\s+date=(.+)$/);
  if (!m) {
    throw new Error(`Invalid detail format: ${decoded}`);
  }
  const busWay = capitalizeWords(m[1].trim());
  const departureDate = m[2].trim();
  return { busWay, departureDate };
}

// GET route to fetch available buses based on way and date
router.get("/:details", async (req, res) => {
    try {
        const details = req.params.details;
        if(details.split("=").includes('id')){
            const id = details.split("=")[1];
            const allData = await availableModel.findOne({
                _id: id
            }).populate('ticketId',"seatBooked -_id");
            return res.json(allData);
        }
        const {busWay, departureDate} = parseWayDate(details);
        const data = await availableModel.find({
            busWay,
            departureDate
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/",async(req,res)=>{
    try{
        const data = await availableModel.find();
        res.json(data);
    }catch(err){
        res.status(500).json({message:err.message})
    }
});
router.post("/", async (req, res) => {
    try {
        const {busName,busWay,departureDate,departureTime,timeRequired,ticketPrice,seatsAvailable,droppingPoint,boardingPoint} = req.body;
        await availableModel.create({
            busName,
            busWay,
            departureDate,
            departureTime,
            timeRequired,
            ticketPrice,
            seatsAvailable,
            droppingPoint,
            boardingPoint
        })
        res.status(201).json({ message: "Data received successfully" });
    } catch (error) {
        console.error("Error creating bus entry:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;