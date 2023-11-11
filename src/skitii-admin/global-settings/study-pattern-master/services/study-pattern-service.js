const studyPatternModel = require("../models/study-pattern-model")


exports.addStudyPattern = async (studyPattern) => {
    return await studyPatternModel.create(studyPattern)
}