
const mongoose = require("mongoose")

const mindfulnessSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
        enum: ["Mindfulness", "Sleep"]
    },
    mood: {
        type: String,
        required: true,
        enum: ["Calm", "Relaxed", "Focused"]
    },
    audioType: {
        type: String,
        required: true,
        enum: ["Instrumental", "Vocal"]
    },
    file: {
        type: String,
        required: true
    },
    status : {
        type : String,
        default : "Active"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Mindfulness", mindfulnessSchema);
