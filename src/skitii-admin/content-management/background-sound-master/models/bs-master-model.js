

const mongoose = require("mongoose");

const bsMasterSchema = new mongoose.Schema({

    fileType: {
        type: String,
        required: true,
        enum : ["Tik Tok", "Live Gaming", "Splash Screens"]
    },
    audioName: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        requried: true
    },
    status: {
        type: String,
        default: "Active"
    }
})

module.exports = mongoose.model("backgroundSoundMaster", bsMasterSchema)