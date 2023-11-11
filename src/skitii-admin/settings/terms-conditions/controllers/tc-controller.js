
const termConditionService = require("../services/tc-service")

// termCondition - add 
exports.addTermCondition = async (req, res) => {
    try {
        const termConditionData = req.body;
        const { fileText } = termConditionData;

        if (!fileText) {
            return res.status(400).json({ status: false, message: "file text is required" })
        }

        const savedTermCondition = await termConditionService.addTermCondition(termConditionData)
        return res.status(201).json({ status: "success", data: savedTermCondition })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
