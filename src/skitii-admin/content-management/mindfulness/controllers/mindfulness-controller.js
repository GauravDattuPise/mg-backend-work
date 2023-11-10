
const mindfulnessService = require("../services/mindfulness-service")


// mindfulness - add file
exports.addMindfulnessFile = async (req, res) => {
    try {
        const fileData = req.body;
        const { option, mood, audioType, file, status } = fileData;

        if (!option || !mood || !audioType || !file) {
            return res.status(400).json({ status: false, message: "invalid filedata inputs" })
        }

        if (option !== "Mindfulness" && option !== "Sleep") {
            return res.status(400).json({ status: false, message: "invalid option" })
        }

        if (mood !== "Calm" && mood !== "Relaxed" && mood !== "Focused") {
            return res.status(400).json({ status: false, message: "invalid mood" })
        }

        if (audioType !== "Instrumental" && audioType !== "Vocal") {
            return res.status(400).json({ status: false, message: "invalid audio type" })
        }

        if (status) {
            if (status !== "Active") {
                return res.status(400).json({ status: false, message: "invalid status" })
            }
        }
        // i have to add file code , for adding file name in db
        const savedMindfulnessFile = await mindfulnessService.addMindfulnessFile(fileData);
        return res.status(201).json({ status: "success", data: savedMindfulnessFile })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// mindfulness - delete file
exports.deleteMindfulnessFile = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: "id required" })
        }

        const checkFile = await mindfulnessService.checkMindfulnessFile(id)
        if (!checkFile) {
            return res.status(404).json({ status: false, message: "file not found" })
        }

        if (checkFile.status === "InActive") {
            return res.status(400).json({ status: false, message: "file already deleted" })
        }

        const deletedFile = await mindfulnessService.deleteMindfulnessFile(id);
        return res.status(200).json({ status: true, message: "file deleted", deletedFile })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// get subscriptions
exports.getMindfulnessFile = async (req, res) => {
    try {
        const { pageNo, limit } = req.body;
        if (!pageNo || !limit) {
            return res.status(400).send({ status: false, message: "invalid inputs" })
        }

        const skipFiles = (pageNo - 1) * limit
        const files = await mindfulnessService.getMindfulnessFile(skipFiles, limit);

        if (files.length === 0) {
            return res.status(404).send({ status: false, message: "Data not available" })
        }

        return res.status(200).send({ status: true, totalDocs: files.length, files })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}



// badge - update 
exports.updateMindfulnessFile = async (req, res) => {
    try {
        const { id } = req.params
        const fileData = req.body;

        const { option, mood, audioType, file } = fileData;

        if (Object.keys(fileData).length === 0) {
            return res.status(400).send({ status: false, message: "some data is requried to update badge" })
        }

        if (!id) {
            return res.status(400).json({ status: false, message: "id is required" })
        }

        if (option) {
            if (option !== "Mindfulness" && option !== "Sleep") {
                return res.status(400).json({ status: false, message: "invalid option" })
            }
        }

        if (mood) {
            if (mood !== "Calm" && mood !== "Relaxed" && mood !== "Focused") {
                return res.status(400).json({ status: false, message: "invalid mood" })
            }
        }

        if (audioType) {
            if (audioType !== "Instrumental" && audioType !== "Vocal") {
                return res.status(400).json({ status: false, message: "invalid audio type" })
            }
        }

        const findfileData = await mindfulnessService.checkMindfulnessFile(id)
        if (!findfileData) {
            return res.status(404).json({ status: false, message: "mindfulness file data not found" })
        }

        const updatedFile = await mindfulnessService.updateMindfulnessFile(id, fileData)
        return res.status(200).json({ status: "success", data: updatedFile })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}