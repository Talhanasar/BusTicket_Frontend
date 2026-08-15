const mongoose = require("mongoose");

const availableSchema = new mongoose.Schema({
    busName:{
        type: String,
        required: true
    },
    busWay:{
        type: String,
        required: true
    },
    departureDate:{
        type: String,
        required: true
    },
    timeRequired:{
        type: String,
    },
    departureTime:{
        type: String,
        required: true
    },
    ticketPrice:{
        type: Number,
        required: true
    },
    boardingPoint:{
        type: String,
        required: true
    },
    droppingPoint:{
        type: String,
        required: true
    },
    seatsAvailable:{
        type: Number,
        default: 45
    },
    // Atomic seat reservation ledger. New reservations land here via
    // $addToSet inside a single conditional update. Existing ticketId
    // remains the booking history; new reservations backfill bookedSeats
    // on demand so legacy buses converge on the new safety guarantee.
    bookedSeats:{
        type: [String],
        default: []
    },
    ticketId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer" // Make sure this matches the registered model name
    }]
});

module.exports = mongoose.model("availableBus", availableSchema);