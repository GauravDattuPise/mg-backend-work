const termConditionModel = require("../models/tc-model")

// adding termCondition 
exports.addTermCondition = async (fileText) => {
    return await termConditionModel.create(fileText);
}
