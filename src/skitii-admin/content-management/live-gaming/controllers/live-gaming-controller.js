const liveGamingService = require("../services/live-gaming-service")

exports.addQuestion = async (req, res) => {
    try {
        const questionData = req.body
        const { question, group, option1, option2, option3, option4, correctOption, status } = questionData

        if (!question || !group || !option1 || !option2 || !option3 || !option4 || !correctOption) {
            return res.status(400).json({ status: false, message: "all inputs are required" })
        }

        if (status) {
            if (status !== "Active") {
                return res.status(400).json({ status: false, message: "invalid status" })
            }
        }

        if (group !== "General" && group !== "JEE" && group !== "NEET") {
            return res.status(400).json({ status: false, message: "invalid group" })
        }

        if (correctOption !== "Option1" && correctOption !== "Option2" && correctOption !== "Option3" && correctOption !== "Option4") {
            return res.status(400).json({ status: false, message: "invalid correct answer option" })
        }

        const savedQuestion = await liveGamingService.addQuestion(questionData)
        return res.status(201).json({ status: true, message: "question added", savedQuestion })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// update the question
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params
        const questionData = req.body

        if (!id) {
            return res.status(400).json({ status: false, message: "question id required" })
        }
        if (Object.keys(questionData).length === 0) {
            return res.status(400).json({ status: false, message: "provide some fields to update" })
        }
        const { question, group, option1, option2, option3, option4, correctOption } = questionData

        if (group) {
            if (group !== "General" && group !== "JEE" && group !== "NEET") {
                return res.status(400).json({ status: false, message: "invalid group" })
            }
        }

        if (correctOption) {
            if (correctOption !== "Option1" && correctOption !== "Option2" && correctOption !== "Option3" && correctOption !== "Option4") {
                return res.status(400).json({ status: false, message: "invalid correct answer option" })
            }
        }

        const findQuestion = await liveGamingService.findQuestion(id)
        if (!findQuestion) {
            return res.status(404).send({ status: false, message: "question not found" })
        }

        const updatedQuestion = await liveGamingService.updateQestion(id, questionData)
        return res.status(200).send({ status: true, message: "question updated", updatedQuestion })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// delete the question
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: "id is required" })
        }

        const findQuestion = await liveGamingService.findQuestion(id)
        if (!findQuestion) {
            return res.status(404).send({ status: false, message: "Question not found" })
        }

        const deletedQuestion = await liveGamingService.deleteQuestion(id)
        return res.status(200).json({ status: true, message: "question deleted", deletedQuestion })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// get the questions
exports.getQuestion = async (req, res) => {
    try {

        const { pageNo, limit } = req.body;
        if (!pageNo || !limit) {
            return res.status(400).send({ status: false, message: "invalid inputs" })
        }

        const skipQuestion = (pageNo - 1) * limit

        const questions = await liveGamingService.getQuestion(skipQuestion,limit)
        if(questions.length === 0){
            return res.status(404).json({status : false, message : "No questions found"})
        }

        return res.status(200).json({status : true, total : questions.length, questions})

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}