const splashModel = require("../models/splash-model")

// adding splash 
exports.addSplash = async (splash) => {
    return await splashModel.create(splash);
}

// deleting splash
exports.deleteSplash = async (id) => {
    return await splashModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}

// check splash exists or not
exports.findSplash = async (id) => {
    return await splashModel.findOne({ _id: id, status: "Active" })
}

// get splash (pagination)
exports.getSplash = async (splash, limit) => {
    return await splashModel.find({status : "Active"}).skip(splash).limit(limit)
}

exports.updateSplash = async (id, { comment, ageGroup, language }) => {
    return await splashModel.findByIdAndUpdate(id, { $set: { comment, ageGroup, language } }, { new: true })
}