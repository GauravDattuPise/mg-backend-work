

const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    allUsers: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        enum: ["Splash", "Live Gaming", "Tik Tok", "Streak"]
    },
    status : {
        type : String,
        default : "Active"
    }
})

module.exports = mongoose.model("notification", notificationSchema);
