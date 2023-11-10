
const bsMasterService = require("../services/bs-master-service")


// background sound master - add file
exports.addFileData = async (req, res) => {
    try {
        const fileData = req.body;
        const { fileType, audioName, file, status } = fileData;

        if (!fileType || !audioName || !file) {
            return res.status(400).json({ status: false, message: "invalid filedata inputs" })
        }

        if (fileType !== "Tik Tok" && fileType !== "Live Gaming" && fileType !== "Splash Screens") {
            return res.status(400).json({ status: false, message: "invalid file type" })
        }

        if (status) {
            if (status !== "Active") {
                return res.status(400).json({ status: false, message: "invalid status" })
            }
        }
        // i have to add file code , for adding file name in db
        const savedFileData = await bsMasterService.addFileData(fileData);
        return res.status(201).json({ status: "success", data: savedFileData })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// background sound master file - update 
exports.updateFileData = async (req, res) => {
    try {
        const { id } = req.params
        const fileData = req.body;

        const { fileType, audioName, file } = fileData;

        if (Object.keys(fileData).length === 0) {
            return res.status(400).send({ status: false, message: "some data is requried to update file data" })
        }

        if (!id) {
            return res.status(400).json({ status: false, message: "id is required" })
        }
        if (fileType) {
            if (fileType !== "Tik Tok" && fileType !== "Live Gaming" && fileType !== "Splash Screens") {
                return res.status(400).json({ status: false, message: "invalid file type" })
            }
        }

        const findFileData = await bsMasterService.findFileData(id)
        if (!findFileData) {
            return res.status(404).json({ status: false, message: "file data not found" })
        }

        const updatedFileData = await bsMasterService.updateFileData(id, fileData)
        return res.status(200).json({ status: "success", data: updatedFileData })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



// background sound master - delete file
exports.deleteFileData = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: "id required" })
        }

        const findFile = await bsMasterService.findFileData(id)
        if (!findFile) {
            return res.status(404).json({ status: false, message: "file not found" })
        }

        const deletedFile = await bsMasterService.deleteFileData(id);
        return res.status(200).json({ status: true, message: "file deleted", deletedFile })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



// background sound master - get files data
exports.getFilesData = async (req, res) => {
    try {
        const { pageNo, limit } = req.body;
        if (!pageNo || !limit) {
            return res.status(400).send({ status: false, message: "invalid inputs" })
        }

        const skipFiles = (pageNo - 1) * limit
        const files = await bsMasterService.getFileData(skipFiles, limit);

        if (files.length === 0) {
            return res.status(404).send({ status: false, message: "Data not available" })
        }

        return res.status(200).send({ status: true, totalFiles: files.length, files })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
