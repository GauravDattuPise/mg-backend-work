
const express = require("express");
const { addQuestion, updateQuestion, deleteQuestion, getQuestion } = require("../controllers/live-gaming-controller");
const router = express.Router();

router.route("/").post(addQuestion).get(getQuestion)

router.route("/:id").patch(updateQuestion).delete(deleteQuestion)

module.exports = router