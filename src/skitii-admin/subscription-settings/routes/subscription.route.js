
const express = require("express");
const { addSubscription, updateSubscription, getSubscriptions, deleteSubscription } = require("../controllers/subscription.controller");
const router = express.Router();

router.route("/").post(addSubscription).get(getSubscriptions)
router.route("/:id").patch(updateSubscription).delete(deleteSubscription);


module.exports = router