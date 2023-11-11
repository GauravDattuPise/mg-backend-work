
const studyPatternService = require("../services/study-pattern-service")

// add studyPattern
exports.addStudyPattern = async (req, res) => {
    try {
        const studyPatternData = req.body
        const { avgImprovement,avgTimeFrame,noOfBreaks } = studyPatternData

        if (!avgImprovement || !avgTimeFrame || !noOfBreaks) {
            return res.status(400).json({ status: false, message: "invalid studyPattern inputs" })
        }

        if (!["10%", "20%", "30%"].includes(avgImprovement)) {
            return res.status(400).json({ status: false, message: "invalid average improvement" })
        }

        if (!["5%", "10%", "15%", "20%", "25%"].includes(avgTimeFrame)) {
            return res.status(400).json({ status: false, message: "invalid average time frame" })
        }

        if (!["5%", "10%", "15%", "20%", "25%"].includes(noOfBreaks)) {
            return res.status(400).json({ status: false, message: "invalid no of breaks" })
        }

        const studyPattern = await studyPatternService.addStudyPattern(studyPatternData)
        return res.json({ data: studyPattern, status: "success" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
