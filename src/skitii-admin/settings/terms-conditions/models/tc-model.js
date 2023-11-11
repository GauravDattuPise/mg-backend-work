

const mongoose = require("mongoose")

const termConditionsSchema = new mongoose.Schema({
   
    fileText : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("TermConditions", termConditionsSchema)