const express = require("express");
const router = express.Router();

const { addSplash, updateSplash, deleteSplash, getSplash } = require("../controllers/splash-controller");


router.route("/").post(addSplash).get(getSplash)

router.route("/:id").patch(updateSplash).delete(deleteSplash)

module.exports = router