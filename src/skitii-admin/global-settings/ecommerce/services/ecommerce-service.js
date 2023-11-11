const ecommerceModel = require("../models/ecommerce-model")

// adding product 
exports.addProduct = async (product) => {
    return await ecommerceModel.create(product);
}

// deleting product
exports.deleteProduct = async (id) => {
    return await ecommerceModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}

// check product exists or not
exports.checkProduct = async (id) => {
    return await ecommerceModel.findOne({ _id: id, status: "Active" })
}


// get product (pagination)
exports.getProducts = async (products, limit) => {
    return await ecommerceModel.find({ status: "Active" }).skip(products).limit(limit)
}

exports.updateProduct = async (id, {  }) => {
    return await ecommerceModel.findByIdAndUpdate(id, { $set: {  } }, { new: true })
}