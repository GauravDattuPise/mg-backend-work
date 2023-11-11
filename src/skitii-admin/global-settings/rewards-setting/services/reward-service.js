const rewardModel = require("../models/reward-model")


exports.addReward = async (reward) => {
    return await rewardModel.create(reward)
}

exports.getRewards = async (skipRewards,limit) => {
    return await rewardModel.find().skip(skipRewards).limit(limit)
}