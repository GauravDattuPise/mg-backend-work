

const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true,
    },
    issueType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
        required: true
    },
    status : {
        type :String,
        default : "Active"
    }
})

module.exports = mongoose.model("feedback", feedbackSchema);
