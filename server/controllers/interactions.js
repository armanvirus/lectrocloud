const jwt = require('jsonwebtoken');
const lights = require('../db/lights');
module.exports = {
   reaction:(req,res)=>{
       const {user,reactedLight} = req.body;
       console.log(reactedLight)
       var like;
    jwt.verify(user, process.env.JWT_KEY, (error, decoded) =>{
        if(error) throw error;

        lights.findOne({_id:reactedLight},(err,result1)=>{
            if(err) throw err;

            like = result1.likes;
            if(like.indexOf(decoded.id) == -1){
                lights.findByIdAndUpdate(reactedLight,{$push:{"likes":decoded.id}},
                {new:true, upsert:true},function(err,result){
                    if(err) throw err;
                    // console.log(result.likes, "added");
                        res.json({added:true});
                    })
                }else{
                    like.splice(like.indexOf(decoded.id), 1);
                    lights.findByIdAndUpdate(reactedLight, {$set:{"likes":like}},(err, success)=>{
                        if(err) throw err;
                        // console.log(success.likes, "removed");
                        res.json({added:false});
                    })
                }


        })

    })
   } 


}