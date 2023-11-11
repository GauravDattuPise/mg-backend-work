
const express = require("express");
const router = express.Router();

const { addReward, getRewards } = require("../controllers/reward-controller");

router.route("/").post(addReward).get(getRewards)

module.exports = router