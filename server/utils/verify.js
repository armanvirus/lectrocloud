const postData = require('./testingData')
const lights = require('../db/lights')
const jwt = require('jsonwebtoken')
const randomLights = require("./randomLights")
const lightsObj = require("./getCommentCount");
const parseToken = require("./parseToken");
module.exports = async (req,res)=>{
    const requiredEntries = require("./lights_constants")()
    const { pageNum,pageSize } = req.query
    // console.log(pageNum)
        try{
            const decoded = await parseToken(req);
     if(decoded){
         console.log(decoded)
         let relatedLights = await lights.find({$and: [
            { level: decoded.level },
            { academicSession: decoded.academicSession } 
         ]}).sort("-lightOn")
            .limit(pageSize)
            .skip((pageNum) * pageSize)
            .select(requiredEntries)
            .exec();
            let lighsObjv2 = await lightsObj(relatedLights)
    
            return res.status(200).json({postData:lighsObjv2})
     }else{
        // randomLights(pageNum,pageSize) // get the lights
        let Lights = await  randomLights(pageNum,pageSize)
        //get comments count from the light and return light + comment count
        let lighsObjv2 = await lightsObj(Lights)
        return res.status(200).json({postData:lighsObjv2})
     }
    }catch(err){
        // randomLights(pageNum,pageSize) // get the lights
        let Lights = await  randomLights(pageNum,pageSize)
        //get comments count from the light and return light + comment count
        let lighsObjv2 = await lightsObj(Lights)
        return res.status(200).json({postData:lighsObjv2})
    }

        let Lights = await randomLights(pageNum,pageSize);
        res.status(200).json({postData:Lights})

}
