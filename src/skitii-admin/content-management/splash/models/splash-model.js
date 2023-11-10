
const mongoose = require("mongoose")

const splashSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    ageGroup: {
        type: String,
        required: true,
        enum: ["13-18", "18+"]
    },
    language: {
        type: String,
        required: true,
        enum: ["English", "Hindi"]
    },
    status : {
        type : String,
        default : "Active"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Splash", splashSchema);
