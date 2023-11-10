const liveGamingModel = require("../models/live-gaming-model")

exports.addQuestion = async (question) => {
    return await liveGamingModel.create(question)
}

exports.updateQestion = async (id, { question, option1, option2, option3, option4, correctOption }) => {
    return await liveGamingModel.findByIdAndUpdate(id, { $set: { question, option1, option2, option3, option4, correctOption } }, { new: true })
}

exports.findQuestion = async (id) => {
    return await liveGamingModel.findOne({ _id: id, status: "Active" })
}

exports.deleteQuestion = async (id) => {
    return await liveGamingModel.findByIdAndUpdate(id, { $set: { status: "InActive" } }, {new : true})
}

exports.getQuestion = async (documents,limit) => {
    return await liveGamingModel.find({status : "Active"}).skip(documents).limit(limit)
}