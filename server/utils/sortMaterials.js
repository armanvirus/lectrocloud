const Stud = require("../db/Stud")
 module.exports = async(materials)=>{
    const materialsPromises = materials.map((material)=>{
      return new Promise((resolve,reject)=>{
        Stud.findOne({_id:material.author},(err,result)=>{
          if(err){
            reject(err)
          }else{
            resolve({
              user:{name:result.name},
              material:material
            })
          }
        })
      })
    })

    return await Promise.all(materialsPromises)

  }