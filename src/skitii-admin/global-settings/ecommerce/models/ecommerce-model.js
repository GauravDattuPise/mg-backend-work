

const mongoose = require("mongoose")

const ecommerceSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    externalLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Active"
    }
})

module.exports = mongoose.model("Ecommerce", ecommerceSchema);
