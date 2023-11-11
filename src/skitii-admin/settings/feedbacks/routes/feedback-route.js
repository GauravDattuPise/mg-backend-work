
const express = require("express");
const router = express.Router();

const { addFeedback, getFeedbacks, deleteFeedback } = require("../controllers/feedback-controller");


router.route("/").post(addFeedback).get(getFeedbacks)
router.route("/:id").delete(deleteFeedback)

module.exports = router