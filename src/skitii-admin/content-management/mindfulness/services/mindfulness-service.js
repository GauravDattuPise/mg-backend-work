const mindfulnessModel = require("../models/mindfulness-model")

// adding file 
exports.addMindfulnessFile = async (fileData) => {
    return await mindfulnessModel.create(fileData);
}

// deleting file
exports.deleteMindfulnessFile = async (id) => {
    return await mindfulnessModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}

// check file exists or not
exports.checkMindfulnessFile = async (id) => {
    return await mindfulnessModel.findOne({_id : id, status : "Active"})
}


// get file (pagination)
exports.getMindfulnessFile = async (files, limit) => {
    return await mindfulnessModel.find({ status: "Active" }).skip(files).limit(limit)
}

exports.updateMindfulnessFile = async (id, { option, mood, audioType, file }) => {
    return await mindfulnessModel.findByIdAndUpdate(id, { $set: { option, mood, audioType, file } }, { new: true })
}