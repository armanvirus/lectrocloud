const postData = require('./testingData')
const lights = require('../db/lights')
const jwt = require('jsonwebtoken')
module.exports = (req,res)=>{
    let token = req.headers.authorization.split(' ')[1]
    /* the header value is null it treates it as string of ("null")
    not as null data type*/
    if(token != 0){
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                lights.find({},(err,data)=>{  
                    res.status(200).json({postData:data})
                })
            } else {
            //   const data =  postData.filter((el)=> el.level == decoded.level && el.academicSession == decoded.academicSession)
              
              lights.find({$and: [
                { level: decoded.level },
                { academicSession: decoded.academicSession }
              
             ]},(err,foundLights)=>{
                //  console.log(foundLights)
                res.status(200).json({postData:foundLights}) 
             })
            }
        })
    }else{
        lights.find({},(err,data)=>{  
            res.status(200).json({postData:data})
        })
    }
}
