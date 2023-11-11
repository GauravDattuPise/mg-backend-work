const feedbackModel = require("../models/feedback-model")

exports.addFeedback = async (feedback) => {
    return await feedbackModel.create(feedback)
}

exports.getFeedbacks = async (skipfeedbacks,limit) => {
    return await feedbackModel.find({status : "Active"}).skip(skipfeedbacks).limit(limit)
}

exports.findFeedback = async (id) => {
    return await feedbackModel.findOne({_id : id, status : "Active"})
}

exports.deleteFeedback= async (id) => {
    return await feedbackModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}