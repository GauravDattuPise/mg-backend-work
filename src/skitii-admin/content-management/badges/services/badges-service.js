const badgesModel = require("../models/badges-model")

// adding badge 
exports.addBadgeData = async (badge) => {
    return await badgesModel.create(badge);
}

// deleting badge
exports.deleteBadgeData = async (id) => {
    return await badgesModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}

// check badge exists or not
exports.findBadgeData = async (id) => {
    return await badgesModel.findOne({ _id: id, status: "Active" })
}

// get badge (pagination)
exports.getBadgeData = async (badge, limit) => {
    return await badgesModel.find({ status: "Active" }).skip(badge).limit(limit)
}

// updating badge data
exports.updateBadgeData = async (id, { file, timeFrame, number }) => {
    return await badgesModel.findByIdAndUpdate(id, { $set: { file, timeFrame, number } }, { new: true })
}