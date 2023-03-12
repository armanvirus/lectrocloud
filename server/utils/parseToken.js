const jwt = require("jsonwebtoken")
module.exports = async(req)=>{
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')){
          token = token.split(" ")[1]
          // console.log(token)
          return jwt.verify(token,process.env.JWT_KEY)
        }else{
          return false;
        }

};

