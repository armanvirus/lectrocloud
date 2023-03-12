const lights = require("../db/lights")
module.exports = async(pageNum,pageSize)=>{
    const requiredEntries = require("./lights_constants")()
    let relatedLights = await lights.find({})
            .sort("-lightOn")
            .limit(pageSize)
            .skip((pageNum) * pageSize)
            .select(requiredEntries)
            .exec();
            return relatedLights;
}