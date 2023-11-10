
const spalshService = require("../services/splash-service")

// splash - add 
exports.addSplash = async (req, res) => {
    try {
        const splashData = req.body;
        const { comment, ageGroup, language, status } = splashData;

        if (!comment || !ageGroup || !language) {
            return res.status(400).json({ status: false, message: "invalid splashData inputs" })
        }

        if (ageGroup !== "13-18" && ageGroup !== "18+") {
            return res.status(400).json({ status: false, message: "invalid agegroup" })
        }

        if (language !== "Hindi" && language !== "English") {
            return res.status(400).json({ status: false, message: "invalid language" })
        }

        if (status) {
            if (status !== "Active") {
                return res.status(400).json({ status: false, message: "invalid status" })
            }
        }

        const savedSplash = await spalshService.addSplash(splashData)
        return res.status(201).json({ status: "success", data: savedSplash })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// splash - update 
exports.updateSplash = async (req, res) => {
    try {
        const {id} = req.params
        const splashData = req.body;

        const { comment, ageGroup, language } = splashData;

        if(Object.keys(splashData).length === 0){
            return res.status(400).send({status : false, message : "some data is requried to update splash"})
        }
        
        if(!id){
            return res.status(400).json({status : false, message : "id is required"})
        }
        if (ageGroup) {
            if (ageGroup !== "13-18" && ageGroup !== "18+") {
                return res.status(400).json({ status: false, message: "invalid agegroup" })
            }
        }

        if (language) {
            if (language !== "Hindi" && language !== "English") {
                return res.status(400).json({ status: false, message: "invalid language" })
            }
        }

       const findSplash = await spalshService.findSplash(id)
       if(!findSplash){
        return res.status(404).json({ status: false, message: "splash not found" })
       }

        const updatedSplash = await spalshService.updateSplash(id,splashData)
        return res.status(200).json({ status: "success", data: updatedSplash })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



// splash - delete 
exports.deleteSplash = async (req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({status : false, message : "id required"})
        }

        const findSplash = await spalshService.findSplash(id)
        if(!findSplash){
            return res.status(404).json({status : false, message : "splash not found"})
        } 

        const deletedSplash = await spalshService.deleteSplash(id);
        return res.status(200).json({status : true, message : "Splash deleted", deletedSplash})

    } catch (error) {
        return res.status(500).json({error : error.message}) 
    }
}



// get splash
exports.getSplash = async (req,res) =>{
    try {
        const {pageNo, limit} = req.body;
        if(!pageNo || !limit){
            return res.status(400).send({status : false, message : "invalid inputs"})
        }

        const skipSplash = (pageNo - 1) * limit
        const splash = await spalshService.getSplash(skipSplash, limit);

        if(splash.length === 0){
            return res.status(404).send({status : false, message : "splash not available"})
        }

        return res.status(200).send({status : true, totalDocs : splash.length, splash})

    } catch (error) {
        res.status(500).send({error : error.message})
    }
}
