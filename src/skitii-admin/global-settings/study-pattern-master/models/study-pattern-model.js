

const mongoose = require("mongoose")

const studyPatternSchema = new mongoose.Schema({

    avgImprovement: {
        type: String,
        required: true,
        enum: ["10%", "20%", "30%"]
    },
    avgTimeFrame: {
        type: String,
        required: true,
        enum: ["5%", "10%", "15%", "20%", "25%"]
    },
    noOfBreaks: {
        type: String,
        required: true,
        enum: ["5%", "10%", "15%", "20%", "25%"]
    }
})

module.exports = mongoose.model("StudyPattern", studyPatternSchema);
