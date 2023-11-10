
const subscriptionModel = require("../models/subscription.model")

exports.getSubscriptions = async (documents, limit) => {
    return await subscriptionModel.find({status : "Active"}).skip(documents).limit(limit)
}

exports.addSubscription = async (subscription) => {
    return await subscriptionModel.create(subscription)
}

exports.updateSubscription = async (id, status) => {
    return await subscriptionModel.findOneAndUpdate({ _id: id }, { $set: { status: status } }, { new: true })
}

exports.deleteSubscription = async (id) => {
    return await subscriptionModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}

exports.checkPhone = async (phone) => {
    return await subscriptionModel.findOne({ phone: phone })
}

exports.checkEmail = async (email) => {
    return await subscriptionModel.findOne({ email: email })
}

exports.findSubscription = async (id) => {
    return await subscriptionModel.findById(id)
}