
const notificationModel = require("../models/notification-model")

exports.getNotifications = async (documents, limit) => {
    return await notificationModel.find({ status: "Active" }).skip(documents).limit(limit)
}

exports.addNotification = async (notification) => {
    return await notificationModel.create(notification)
}

exports.updateNotification = async (id, { title, description, type, allUsers }) => {
    return await notificationModel.findOneAndUpdate({ _id: id }, { $set: { title, description, type, allUsers } }, { new: true })
}

exports.deleteNotification = async (id) => {
    return await notificationModel.findByIdAndUpdate(id, { status: "InActive" }, { new: true })
}

exports.findNotification = async (id) => {
    return await notificationModel.findOne({ _id: id, status: "Active" })
}
