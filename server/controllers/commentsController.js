const jwt = require("jsonwebtoken")
const lights = require("../db/lights");
const commentdb = require("../db/comments");
module.exports ={
  comments:(req,res)=>{
    const {comment,lightId, user, images, files} = req.body;
    if(user){
      jwt.verify(user, process.env.JWT_KEY, (error, decoded) =>{
        if(error) throw error;
        const newComment = new commentdb({
          comment,
          lightId,
          files,
          images,
          user:{
            id:decoded.id,
            name:decoded.name,
            profile:"/src/assets/amin.png"
          },


        })
        
        newComment.save((err,result)=>{
          if(err) throw err;
          res.send(result)
        })
     
        })
      
      
      }else{
        res.send("authentication fail user must login")
      }
    },
    getComments:(req,res)=>{
      const id = req.params.id;
      commentdb.find({lightId:id},(err,result)=>{
        if(err) throw err;
        res.json({comments:result})
      })
    },
    doReply:(req,res)=>{
      const {replyObj,user,commentId} = req.body;
      if(!user){
        res.json({msg:"user is not registered"})
      }else{
        if(!commentId){
          res.status(500).json({msg:"server error"})
        }else{
          
    }
  
  }

}

}
