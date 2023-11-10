

const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
     name : {
        type : String, 
        required : true
     },
     email : {
        type : String,
        required : true,
        unique : true
     },
     package : {
        type : String,
        required : true,
        enum : ["Premium", "Basic"]
     },
     duration : {       // 
        type : Number,
        required : true
     },
     status : {
        type : String,
        required : true,
        enum : ["Active","Cancelled","Request","Expired", "InActive"]  
     },
     phone : {
        type : Number,
        required : true
     },
     expiredOn : {  // expiredOn
        type : Date,
        required : true
     }
})

module.exports =  mongoose.model("Subscription", subscriptionSchema);
