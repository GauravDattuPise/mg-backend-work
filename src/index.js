
const express = require("express");
const mongoose = require("mongoose")

const subscriptionRoute = require("./skitii-admin/subscription-settings/routes/subscription.route")
const mindfulnessRoute = require("./skitii-admin/content-management/mindfulness/routes/mindfulness-route")
const liveGamingRoute = require("./skitii-admin/content-management/live-gaming/routes/live-gaming-route")
const splashRoute = require("./skitii-admin/content-management/splash/routes/splash-route")
const backgroundSoundMaster = require("./skitii-admin/content-management/background-sound-master/routes/bs-master-route")
const badgeRoute = require("./skitii-admin/content-management/badges/routes/badges-route")

const app = express();
app.use(express.json());

// Connecting to db
mongoose.connect("mongodb+srv://gauravpise87:Gaurav2001@gauravdb.crgpvot.mongodb.net/subscription-api")
    .then(() => console.log("db is connected"))
    .catch((err) => console.log("error in connecting with db", err.message))


// subscription path
app.use("/api/v1/subscription", subscriptionRoute);

// mindfulness path
app.use("/api/v1/content-management/mindfulness", mindfulnessRoute)

// live gaming path
app.use("/api/v1/content-management/live-gaming", liveGamingRoute)

// splash path
app.use("/api/v1/content-management/splash", splashRoute)

// background sound master path
app.use("/api/v1/content-management/background-sound-master", backgroundSoundMaster)

// badges path
app.use("/api/v1/content-management/badges", badgeRoute)

const PORT = 5000
app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})

