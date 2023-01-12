const jwt = require("jsonwebtoken")
const lights = require("../db/lights");
const commentdb = require("../db/comments");
module.exports ={
  comments:(req,res)=>{
    const {comment,ightId, user, images, files} = req.body;
    if(user){
      jwt.verify(user, "JWT_SECRET", (error, decoded) =>{
        if(error) throw error;
        const newComment = new commentdb({
          comment,
          mainLight:lightId,
          user:{
            id:decoded.id,
            name:decoded.name,
            profile:decoded.profile
          },
          
          
        })
     
        })
      
      
      }
    }
  
  }
