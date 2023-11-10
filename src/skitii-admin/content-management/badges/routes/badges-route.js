
const express = require("express");
const router = express.Router();

const { addBadgeData, updateBadgeData, deleteBadgeData, getBadgeData } = require("../controllers/badges-controller");

router.route("/").post(addBadgeData).get(getBadgeData)
router.route("/:id").patch(updateBadgeData).delete(deleteBadgeData)

module.exports = router