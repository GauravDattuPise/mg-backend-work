
const notificationService = require("../services/notification-service")

// add notification
exports.addNotification = async (req, res) => {
    try {
        const notificationData = req.body
        const { title, description, type, allUsers } = notificationData

        if (!title || !description || !type) {
            return res.status(400).json({ status: false, message: "invalid notification inputs" })
        }

        if (type !== "Splash" && type !== "Live Gaming" && type !== "Tik Tok" && type !== "Streak") {
            return res.status(400).json({ status: false, message: "invalid notification type" })
        }

        if (allUsers != true && allUsers != false) {
            return res.status(400).json({ status: false, message: "invalid allusers data type" })
        }

        const notification = await notificationService.addNotification(notificationData)
        return res.json({ data: notification, status: "success" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



// update notification
exports.updateNotification = async (req, res) => {
    try {
        const {id} = req.params
        const notificationData = req.body

        const { title, description, type, allUsers } = notificationData

        if(!id){
            return res.status(400).json({status : false, message : "id is requried"})
        }

        if(Object.keys(notificationData).length === 0){
            return res.status(400).json({status : false, message : "some data requried to update notification"})
        }

        if (type) {
            if (type !== "Splash" && type !== "Live Gaming" && type !== "Tik Tok" && type !== "Streak") {
                return res.status(400).json({ status: false, message: "invalid notification type" })
            }
        }

        if (allUsers) {
            if (allUsers != true && allUsers != false) {
                return res.status(400).json({ status: false, message: "invalid allusers data type" })
            }
        }

        const checkNotification = await notificationService.findNotification(id)
        if (!checkNotification) {
            return res.status(404).json({ status: false, message: "notification not found" })
        }

        const updatedNotification = await notificationService.updateNotification(id,notificationData)
        return res.json({ data: updatedNotification, status: "success" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




// delete notification 

exports.deleteNotification = async (req,res) => {
    try {
            const id = req.params.id
            if(!id){
                return res.status(400).send({status : false, message : "id required"})
            }

            const checkNotification = await notificationService.findNotification(id)
            if(!checkNotification){
                return res.status(404).send({status : false, message : "notification not found"})
            }


            const deletedNotification = await notificationService.deleteNotification(id)

            return res.status(200).send({status : false, message : "notification deleted", deletedNotification})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}


// get notification
exports.getNotifications = async (req,res) =>{
    try {
        const {pageNo, limit} = req.body;
        if(!pageNo || !limit){
            return res.status(400).send({status : false, message : "invalid inputs"})
        }

        const skipNotification = (pageNo - 1) * limit
        const notifications = await notificationService.getNotifications(skipNotification, limit);

        if(notifications.length === 0){
            return res.status(400).send({status : false, message : "Data not available"})
        }

        return res.status(200).send({status : true, totalNotifications : notifications.length, notifications})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}

