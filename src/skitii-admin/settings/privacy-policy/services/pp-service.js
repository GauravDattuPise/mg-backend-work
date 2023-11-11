const privacyPolicyModel = require("../models/pp-model")

// adding privacyPolicy 
exports.addPrivacyPolicy = async (privacyPolicy) => {
    return await privacyPolicyModel.create(privacyPolicy);
}
