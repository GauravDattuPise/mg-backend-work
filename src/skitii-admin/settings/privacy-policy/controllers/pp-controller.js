
const privacyPolicyService = require("../services/pp-service")

// privacyPolicy - add 
exports.addPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicyData = req.body;
        const { fileText } = privacyPolicyData;

        if (!fileText) {
            return res.status(400).json({ status: false, message: "file text is required" })
        }

        const savedPrivacyPolicy = await privacyPolicyService.addPrivacyPolicy(privacyPolicyData)
        return res.status(201).json({ status: "success", data: savedPrivacyPolicy })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
