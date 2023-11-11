
const express = require("express");
const router = express.Router();

const { addNotification, updateNotification, deleteNotification, getNotifications } = require("../controllers/notification-controller");

router.route("/").post(addNotification).get(getNotifications)
router.route("/:id").patch(updateNotification).delete(deleteNotification)

module.exports = router