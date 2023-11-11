

const mongoose = require("mongoose")

const privacyPolicySchema = new mongoose.Schema({
   
    fileText : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("PrivacyPolicy", privacyPolicySchema)