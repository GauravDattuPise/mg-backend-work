const express = require("express");
const router = express.Router();

const { addPrivacyPolicy } = require("../controllers/pp-controller");

router.route("/").post(addPrivacyPolicy)

module.exports = router