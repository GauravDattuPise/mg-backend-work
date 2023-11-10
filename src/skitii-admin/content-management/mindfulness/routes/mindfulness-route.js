const express = require("express");
const router = express.Router();

const { addMindfulnessFile, deleteMindfulnessFile, getMindfulnessFile, updateMindfulnessFile } = require("../controllers/mindfulness-controller");

router.route("/").post(addMindfulnessFile).get(getMindfulnessFile)
router.route("/:id").delete(deleteMindfulnessFile).patch(updateMindfulnessFile)

module.exports = router