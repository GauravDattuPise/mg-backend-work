

const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({

    file: {
        type: String,
        requried: true
    },
    timeFrame: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Active"
    }
})

module.exports = mongoose.model("Badges", badgeSchema)