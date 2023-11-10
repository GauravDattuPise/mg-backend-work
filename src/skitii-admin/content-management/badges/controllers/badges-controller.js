
const badgeService = require("../services/badges-service")

// add subscription
exports.addBadgeData = async (req, res) => {
    try {
        const badgeData = req.body
        const { file, timeFrame, number } = badgeData

        if (!file || !timeFrame || !number) {
            return res.status(400).json({ status: false, message: "invalid badge data inputs" })
        }

        if (number < 1 || number > 10) {
            return res.status(400).json({ status: false, message: "invalid number" })
        }

        const savedBadgeData = await badgeService.addBadgeData(badgeData)
        return res.json({ data: savedBadgeData, status: "success" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// badge - update 
exports.updateBadgeData = async (req, res) => {
    try {
        const { id } = req.params
        const badgeData = req.body;

        const { file, timeFrame, number } = badgeData;

        if (Object.keys(badgeData).length === 0) {
            return res.status(400).send({ status: false, message: "some data is requried to update badge" })
        }

        if (!id) {
            return res.status(400).json({ status: false, message: "id is required" })
        }

        if (number) {
            if (number < 1 || number > 10) {
                return res.status(400).json({ status: false, message: "invalid number" })
            }
        }

        const findBadgeData = await badgeService.findBadgeData(id)
        if (!findBadgeData) {
            return res.status(404).json({ status: false, message: "Badge data not found" })
        }

        const updatedBadge = await badgeService.updateBadgeData(id, badgeData)
        return res.status(200).json({ status: "success", data: updatedBadge })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// delete the badge data
exports.deleteBadgeData = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: "id is required" })
        }

        const findBadgeData = await badgeService.findBadgeData(id)
        if (!findBadgeData) {
            return res.status(404).send({ status: false, message: "badge data not found" })
        }

        const deletedBadge = await badgeService.deleteBadgeData(id)
        return res.status(200).json({ status: true, message: "question deleted", deletedBadge })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// badge - get files data
exports.getBadgeData = async (req, res) => {
    try {
        const { pageNo, limit } = req.body;
        if (!pageNo || !limit) {
            return res.status(400).send({ status: false, message: "invalid inputs" })
        }

        const skipFiles = (pageNo - 1) * limit
        const files = await badgeService.getBadgeData(skipFiles, limit);

        if (files.length === 0) {
            return res.status(404).send({ status: false, message: "Data not available" })
        }

        return res.status(200).send({ status: true, totalFiles: files.length, files })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
