
const feedbackService = require("../services/feedback-service")

// add feedback
exports.addFeedback = async (req, res) => {
    try {
        const feedbackData = req.body
        const { userName, collegeName, issueType, description, attachment } = feedbackData

        if (!userName || !collegeName || !issueType || !description || !attachment)  {
            return res.status(400).json({ status: false, message: "invalid feedback inputs" })
        }

        const addedfeedback = await feedbackService.addFeedback(feedbackData)
        return res.json({ data: addedfeedback, status: "success" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// get feedbacks
exports.getFeedbacks = async (req,res) =>{
    try {
        const {pageNo, limit} = req.body;
        if(!pageNo || !limit){
            return res.status(400).send({status : false, message : "invalid inputs"})
        }

        const skipFeedbacks = (pageNo - 1) * limit
        const feedbacks = await feedbackService.getFeedbacks(skipFeedbacks, limit);

        if(feedbacks.length === 0){
            return res.status(400).send({status : false, message : "Data not available"})
        }

        return res.status(200).send({status : true, totalFeedbacks : feedbacks.length, feedbacks})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}



// delete the feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: "id is required" })
        }

        const findFeedback = await feedbackService.findFeedback(id)
        if (!findFeedback) {
            return res.status(404).send({ status: false, message: "feedback not found" })
        }

        const deletedFeedback = await feedbackService.deleteFeedback(id)
        return res.status(200).json({ status: true, message: "feedbackd deleted", deletedFeedback })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

