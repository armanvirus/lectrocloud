const claudinary = require("cloudinary").v2;
const parseToken = require("../utils/parseToken")
const fileUploader = require("../utils/uploadMulFiles")
module.exports = {
    add:async(req,res)=>{
        // console.log(req.files)
        const {title} = req.body;
        const resource = req.files;
        const user = await parseToken(req);
        // console.log(resource)
        // res.json({resource})
        const files =await fileUploader(resource)
        console.log(files)
        if(!files)
            return res.json({msg:"something went wrong"})
            console.log(files)
            res.send(files)
    //     if(!user)
    //     return res.json({status:401, msg:"please login an retry"})
    //     try{
    //         const result = await  claudinary.uploader.upload(files,{
    //             use_filename: true, 
    //             unique_filename: false,
    //             folder:"lectrocloud_resources" });
    //             console.log(result)
    //             res.json({status:201,msg:"uploaded succesfully"})
    //     }catch(err){
    //         console.log(err)
    //         res.send(err)
    //     }

    }
}