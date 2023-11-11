
const rewardService = require("../services/reward-service")

// add reward
exports.addReward = async (req, res) => {
    try {
        const rewardData = req.body
        const { type, coin } = rewardData

        if (!type || !coin) {
            return res.status(400).json({ status: false, message: "invalid reward inputs" })
        }

        if (!["App Starting", "Tik Tok", "Streak", "Mindfulness", "Sleep"].includes(type)) {
            return res.status(400).json({ status: false, message: "invalid reward type" })
        }

        if (typeof coin !== "number") {
            return res.status(400).send({ status: false, message: "type of coin should be number" })
        }

        const addedReward = await rewardService.addReward(rewardData)
        return res.json({ data: addedReward, status: "success" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// get rewards
exports.getRewards = async (req,res) =>{
    try {
        const {pageNo, limit} = req.body;
        if(!pageNo || !limit){
            return res.status(400).send({status : false, message : "invalid inputs"})
        }

        const skipRewards = (pageNo - 1) * limit
        const rewards = await rewardService.getRewards(skipRewards, limit);

        if(rewards.length === 0){
            return res.status(400).send({status : false, message : "Data not available"})
        }

        return res.status(200).send({status : true, totalRewards : rewards.length, rewards})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}
