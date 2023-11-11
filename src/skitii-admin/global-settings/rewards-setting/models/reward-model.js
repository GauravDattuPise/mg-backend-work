
const mongoose = require("mongoose")

const rewardSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
        enum : ["App Starting", "Tik Tok", "Streak", "Mindfulness", "Sleep"]
    },
    coin: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Reward", rewardSchema);
