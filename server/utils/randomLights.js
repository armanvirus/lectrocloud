const lights = require("../db/lights")
module.exports = async(pageNum,pageSize)=>{
    let relatedLights = await lights.find({})
            .sort("-lightOn")
            .limit(pageSize)
            .skip((pageNum) * pageSize)
            .exec();
            return relatedLights;
}