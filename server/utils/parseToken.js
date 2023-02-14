const jwt = require("jsonwebtoken")
module.exports = async(req)=>{
    let token = req.headers.authorization.split(' ')[1]
    /* the header value is null it treates it as string of ("null")
    not as null data type*/

    if(token){
        try{
            const user = await jwt.verify(token, process.env.JWT_KEY)
            return user;
        }catch(error){
            return null;
        }
    }
}