const claudinary = require("cloudinary").v2;
const parseToken = require("../utils/parseToken")
module.exports = {
    add:async(req,res)=>{
        const {title} = req.body;
        const {files} = req.files;
        const user = await parseToken(req);
        if(!user)
        return res.json({status:401, msg:"please login an retry"})
        try{
            const result = await  claudinary.uploader.upload(files,{
                use_filename: true, 
                unique_filename: false,
                folder:"lectrocloud_resources" });
                console.log(result)
                res.json({status:201,msg:"uploaded succesfully"})
        }catch(err){
            console.log(err)
            res.send(err)
        }

    }
}