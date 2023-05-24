const cloudinary = require("cloudinary").v2;
const parseToken = require("../utils/parseToken");
const resourceModel = require("../db/resource")
const sortedMaterials = require('../utils/sortMaterials')
module.exports = {
    add:async(req,res)=>{
        const resource = req.files;
        const user = await parseToken(req);
        if(!user)
            return res.json({status:401, msg:"please login an retry"})
            if(!resource)
            return res.json({msg:"something went wrong"})
            
            Promise.all(
                resource.map((file) =>
                  new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                      { folder: 'lectro_files' },
                      (error, result) => {
                        if (error) {
                          console.error(error);
                          reject(error);
                        } else {
                          console.log(result.secure_url);
                          resolve(result);
                        }
                      }
                    );
                    uploadStream.end(file.buffer);
                  })
                )
              )
                .then((result) => {
                  Promise.all(
                    result.map((resul) =>
                      new Promise((resolve, reject) => {
                        const newResource = new resourceModel({
                          title:req.body.title,
                          file:resul.secure_url,
                          size:resul.bytes,
                          likes:[],
                          author: user.id,
                          level:user.level,
                          academicSession: user.academicSession
  
                      })
                      newResource.save((err,savedResource)=>{
                        if(err){
                          console.log(err)
                          reject(err)
                        }else{
                          resolve(savedResource)
                        }
                      })

                      })
                    )
                  ).then((savedResource)=>{
                    console.log(savedResource)
                    res.json({status:201, msg:"uploaded resources sucessfully"})
                  }).catch((error) => {
                    console.error(error);
                    res.status(500).send('failed to save data to the system.');
                  });
                   
            
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).send('An error occurred during file upload.');
                });

    },
    get: async(req,res)=>{
        const type = req.params.type;
        const page = req.params.page;
        const user = await parseToken(req);
        if(!user){
           const foundResouce = await resourceModel.find({})
            .skip(0)
            // .limit(10);
            const data =await sortedMaterials(foundResouce)
            // console.log(data)
            res.json({status:200, data})
        }else{
            let foundResouce = await lights.find({$and: [
                { level: user.level },
                { academicSession: user.academicSession } 
             ]}).sort("-lightOn")
                // .limit(pageSize)
                // .skip((pageNum) * pageSize)
                // .exec();
        const data = await sortedMaterials(foundResouce);
        console.log(data)
        res.json({status:200, data})
        }
    },
    reaction: async(req,res)=>{
      const {reactedMaterial} = req.body;
      const user = await parseToken(req);
      if(!user)
        return res.json({status:401, msg:"invalid user, do login"});
      
        resourceModel.findOne({_id:reactedMaterial},(err,result1)=>{
          if(err) throw err;
          like = result1.likes;
          if(like.indexOf(user.id) == -1){
              resourceModel.findByIdAndUpdate(reactedMaterial,{$push:{"likes":user.id}},
              {new:true, upsert:true},function(err,result){
                  if(err) throw err;
                  // console.log(result.likes, "added");
                      res.json({added:true});
                  })
              }else{
                  like.splice(like.indexOf(user.id), 1);
                  resourceModel.findByIdAndUpdate(reactedMaterial, {$set:{"likes":like}},(err, success)=>{
                      if(err) throw err;
                      // console.log(success.likes, "removed");
                      res.json({added:false});
                  })
              }

      })

    }
}