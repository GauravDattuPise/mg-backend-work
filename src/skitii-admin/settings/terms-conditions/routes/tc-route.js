const express = require("express");
const router = express.Router();

const { addTermCondition } = require("../controllers/tc-controller");


router.route("/").post(addTermCondition)

module.exports = router