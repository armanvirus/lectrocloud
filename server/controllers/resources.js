const cloudinary = require("cloudinary").v2;
const parseToken = require("../utils/parseToken");
const resourceModel = require("../db/resource")
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
                          resolve(result.secure_url);
                        }
                      }
                    );
                    uploadStream.end(file.buffer);
                  })
                )
              )
                .then( async(urls) => {
                    const newResource = new resourceModel({
                        title:req.body.title,
                        files:urls,
                        author: user.id,
                        level:user.level,
                        academicSession: user.academicSession

                    })
                    const savedResource = await newResource.save()
                    if(!savedResource)
                        return res.json({status:401, msg:"failed to add resource"})
                        res.json({ status:201, msg: 'Files uploaded successfully!', urls });
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).send('An error occurred during file upload.');
                });

    //     if(!user)
    //     return res.json({status:401, msg:"please login an retry"})
    //     try{
    //         const result = await  claudinary.uploader.upload(file,{
    //             use_filename: true, 
    //             unique_filename: false,
    //             folder:"lectrocloud_resources" });
    //             console.log(result)
    //             res.json({status:201,msg:"uploaded succesfully"})
    //     }catch(err){
    //         console.log(err)
    //         res.send(err)
    //     }

    },
    get: async(req,res)=>{
        const user = await parseToken(req);
        if(!user){
           const foundResouce = await resourceModel.find({})
            .skip(0)
            .limit(10);

            res.json({status:200, data:foundResouce})
        }else{
            let foundResouce = await lights.find({$and: [
                { level: user.level },
                { academicSession: user.academicSession } 
             ]}).sort("-lightOn")
                .limit(pageSize)
                .skip((pageNum) * pageSize)
                .exec();

        res.json({status:200, data:foundResouce})
        }
    }
}