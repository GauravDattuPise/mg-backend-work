
const express = require("express");
const router = express.Router();

const { addStudyPattern } = require("../controllers/study-pattern-controller");


router.route("/").post(addStudyPattern)
module.exports = router