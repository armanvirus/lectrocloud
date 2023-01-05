const jwt = require('jsonwebtoken')
const postData = require('./testingData')
module.exports = (req,res)=>{
    let token = req.headers.authorization.split(' ')[1]
    /* the header value is null it treates it as string of ("null")
    not as null data type*/
    if(token != 0){
        jwt.verify(token, "JWT_SECRET", (error, decoded) => {
            if (error) {
              res.status(200).json({postData})
            } else {
              const data =  postData.filter((el)=> el.level == decoded.level && el.academicSession == decoded.academicSession)
              res.status(200).json({postData:data})
            }
        })
    }else{
        res.status(200).json({postData})
    }
}
