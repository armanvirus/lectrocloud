const postData = require('./testingData')
const lights = require('../db/lights')
const jwt = require('jsonwebtoken')
const randomLights = require("./randomLights")
module.exports = async (req,res)=>{
    var token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1]
    }else{
        token = 0
    }
    const { pageNum,
            pageSize } = req.query
    /* the header value is null it treates it as string of ("null")
    not as null data type*/
    if(token != 0){
        try{
     const  decoded = await jwt.verify(token, process.env.JWT_KEY);
     if(decoded){
         let relatedLights = await lights.find({$and: [
            { level: decoded.level },
            { academicSession: decoded.academicSession } 
         ]}).sort("-lightOn")
            .limit(pageSize)
            .skip((pageNum) * pageSize)
            .exec();

            return res.status(200).json({postData:relatedLights})
     }else{
        // randomLights(pageNum,pageSize)
        let Lights = await  randomLights(pageNum,pageSize)
        return res.status(200).json({postData:Lights})
     }
    }catch(err){
        // randomLights(pageNum,pageSize)
        let Lights = await randomLights(pageNum,pageSize);
        return res.status(200).json({postData:Lights})
    }
    
}

        let Lights = await randomLights(pageNum,pageSize);
        res.status(200).json({postData:Lights})

}
