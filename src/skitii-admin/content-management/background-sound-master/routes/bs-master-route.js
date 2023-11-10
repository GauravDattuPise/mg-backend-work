const express = require("express");
const router = express.Router();

const { addFileData, updateFileData, deleteFileData, getFilesData } = require("../controllers/bs-master-controller");

router.route("/").post(addFileData).get(getFilesData)
router.route("/:id").patch(updateFileData).delete(deleteFileData)

module.exports = router