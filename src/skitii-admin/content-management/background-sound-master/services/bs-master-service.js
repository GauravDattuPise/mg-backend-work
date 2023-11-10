const bsMasterModel = require("../models/bs-master-model")

exports.addFileData = async (fileData) => {
    return await bsMasterModel.create(fileData)
}

exports.updateFileData = async (id, { fileType, audioName, file }) => {
    return await bsMasterModel.findByIdAndUpdate(id, { $set: { fileType, audioName, file } }, { new: true })
}

exports.findFileData = async (id) => {
    return await bsMasterModel.findOne({ _id: id, status: "Active" })
}

exports.deleteFileData = async (id) => {
    return await bsMasterModel.findByIdAndUpdate(id, { $set: { status: "InActive" } }, { new: true })
}

exports.getFileData = async (filesDocument, limit) => {
    return await bsMasterModel.find({ status: "Active" }).skip(filesDocument).limit(limit)
}