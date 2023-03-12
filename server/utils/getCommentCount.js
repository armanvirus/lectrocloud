const comments = require("../db/comments")
module.exports = async (lights) => {
    let embededLights = [];
  
    // Map the lights to an array of promises that resolves to an object with the comments count
    const promises = lights.map((light) => {
      const {academicSession, author, files, images, level, lightOn, likes ,note, user, _id} = light
      return new Promise((resolve, reject) => {
        comments.countDocuments({ lightId: light._id }, (err, counts) => {
          if (err) {
            reject({
              academicSession, 
              author, 
              files, 
              images, 
              level, 
              lightOn, 
              likes ,
              note, 
              user, 
              _id,
                comments: 0,
              });
          } else {
            resolve({
              academicSession, 
              author, 
              files, 
              images, 
              level, 
              lightOn, 
              likes ,
              note, 
              user, 
              _id,
              comments: counts,
            });
          }
        });
      });
    });
  
    // Wait for all the promises to resolve and add the objects to the embededLights array
    embededLights = await Promise.all(promises);
  
    console.log(embededLights);
  
    return embededLights;
  };