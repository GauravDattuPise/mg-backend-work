

const mongoose = require("mongoose");

const liveGamingSchema = new mongoose.Schema({
   
    question: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        enum: ["General", "JEE", "NEET"]
    },
    option1: {
        type: String,
        requried: true
    },
    option2: {
        type: String,
        requried: true
    },
    option3: {
        type: String,
        requried: true
    },
    option4: {
        type: String,
        requried: true
    },
    correctOption : {
        type : String,
        required : true,
        enum : ["Option1","Option2","Option3","Option4"]
    },
    status : {
        type : String,
        default : "Active"
    }
})

module.exports = mongoose.model("LiveGaming", liveGamingSchema)