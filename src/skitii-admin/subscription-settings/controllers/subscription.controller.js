
const subscriptionService = require("../services/subscription.service")
const { validateName, validateEmail, validatePhone } = require("../validations/validate")

// add subscription
exports.addSubscription = async (req,res) =>{
    try {
        const subscriptionData = req.body
        const {name,email,package,duration,status,phone,expiredOn} = subscriptionData

        if(!name || !email || !package || !duration || !status || !phone || !expiredOn ){
              return res.status(400).json({status : false, message : "invalid inputs"})
        }

        if(validateName(name) === false){
            return res.status(400).json({status : false, message : "invalid name"})
        }

        if(validateEmail(email) === false){
            return res.status(400).json({status : false, message : "invalid email"})
        }

        if(package !== "Basic" && package !== "Premium"){
            return res.status(400).json({status : false, message : "invalid package"})
        }

        if(duration < 1 || duration > 12){
            return res.status(400).json({status : false, message : "invalid duration"})
        }
        
        if(status !== "Active" && status !== "Cancelled" && status !== "Request" && status !== "Expired" ){
            return res.status(400).json({status : false, message : "invalid status"})
        }
      
        if(validatePhone(phone) === false){
            return res.status(400).json({status : false, message : "invalid phone"})
        }
        
        const checkEmail = await subscriptionService.checkEmail(email)
        if(checkEmail){
            return res.status(400).json({status : false, message : "email already have subscription"})
        }

        const checkPhone = await subscriptionService.checkPhone(phone)
        if(checkPhone){
            return res.status(400).json({status : false, message : "phone already have subscrption"})
        }


        const subscription = await subscriptionService.addSubscription(subscriptionData)
        return res.json({data : subscription, status : "success"})

    } catch (err) {
        res.status(500).json({error : err.message})
    }
}


// update subscription
exports.updateSubscription = async(req,res)=>{
    try {
            const id = req.params.id
            const {status, ...rest} = req.body;
            if(!id){
                return res.status(400).json({status : false, message : "subscription id required"})
            }

            if(!status){
                return res.status(400).json({status : false, message : "Status is required"})
            }

            if(status !== "Active" && status !== "Cancelled" && status !== "Request" && status !== "Expired" ){
                return res.status(400).send({status : false, message : "invalid status"})
            }

            if(Object.keys(rest).length !== 0){
                return res.status(400).send({status : false, message : "You can only update the status of subscription"})
            }
 
            const checkSubcription = await subscriptionService.findSubscription(id)
            if(!checkSubcription){
                return res.status(404).json({status : false, message : "subscription not found"})
            }

            if(checkSubcription.status === status){
                return res.status(400).json({status : false, message : `status already ${status}`})
            }

            const subscriptionUpdated = await subscriptionService.updateSubscription(id,status)
            return res.status(200).send({status : true, subscription : subscriptionUpdated})

    } catch (err) {
        res.status(500).json({error : err.message})
    }
}


// get subscriptions
exports.getSubscriptions = async (req,res) =>{
    try {
        const {pageNo, limit} = req.body;
        if(!pageNo || !limit){
            return res.status(400).send({status : false, message : "invalid inputs"})
        }

        const skipDocument = (pageNo - 1) * limit
        const documents = await subscriptionService.getSubscriptions(skipDocument, limit);

        if(documents.length === 0){
            return res.status(400).send({status : false, message : "Data not available"})
        }

        return res.status(200).send({status : true, totalDocs : documents.length, documents})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}


// delete subscription 

exports.deleteSubscription = async (req,res) => {
    try {
            const id = req.params.id
            if(!id){
                return res.status(400).send({status : false, message : "id required"})
            }

            const findSubcription = await subscriptionService.findSubscription(id)
            if(!findSubcription){
                return res.status(404).send({status : false, message : "Subscription not found"})
            }

            if(findSubcription.status === "InActive"){
                return res.status(400).send({status : false, message : "subscription already InActive"})
            }

            const deletedSubscription = await subscriptionService.deleteSubscription(id)

            return res.status(200).send({status : false, message : "subscription deleted", deletedSubscription})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}


