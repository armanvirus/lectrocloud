// const cloudinary = require("cloudinary");
// const fs = require("fs");

// const uploadFiles = (files) => {
//   console.log("upload started")
//   let uploadedRes = []
//   return Promise.all(Object.values(files).map((file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(file.filepath,
//         { resource_type: "auto" },
//          (err, result) => {
//         if (err) {
//           console.log("erro occured")
//           reject(err);
//         } else {
//           console.log("assets uploaded")
//           uploadedRes.push(result)
//           resolve(result);
//         }
//       });
//     });
//   })).then((result) => {
//     console.log(result);
//     return result;
//   }).catch((err) => {
//     console.log(err);
//     return err;
//   });
// };

// module.exports = uploadFiles;

// const cloudinary = require("cloudinary");
// const fs = require("fs");

// const uploadFiles = (files) => {
//   console.log("upload started");
//   let uploadedRes = [];
//   let promises = [];
//   Object.values(files).forEach((file) => {
//     promises.push(new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(file.filepath,
//         { resource_type: "auto" },
//          (err, result) => {
//         if (err) {
//           console.log("error occurred");
//           reject(err);
//         } else {
//           console.log("assets uploaded");
//           uploadedRes.push(result);
//           resolve(result);
//         }
//       });
//     }));
//   });

//   return Promise.all(promises).then((result) => {
//     console.log(result);
//     return result;
//   }).catch((err) => {
//     console.log(err);
//     return err;
//   });
// };

// module.exports = uploadFiles;



// const cloudinary = require("cloudinary");
// const fs = require("fs");

// const uploadFiles = (files) => {
//   console.log("upload started")
//   let uploadedRes = []
//   return Promise.all(Object.values(files).map((file) => {
//     return new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { resource_type: "auto" },
//         (error, result) => {
//           if (error) {
//             console.log("error occurred");
//             reject(error);
//           } else {
//             console.log("asset uploaded");
//             uploadedRes.push(result);
//             resolve(result);
//           }
//         }
//       );
//       fs.createReadStream(file.filepath).pipe(uploadStream);
//     });
//   })).then((result) => {
//     console.log(result);
//     return result;
//   }).catch((err) => {
//     console.log(err);
//     return err;
//   });
// };

// module.exports = uploadFiles;


// const cloudinary = require("cloudinary");
// const fs = require("fs");

// const uploadFiles = (files) => {
//   console.log("upload started");
//   let uploadedRes = [];
//   return Promise.all(
//     Object.values(files).map((file) => {
//       return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(
//           file.filepath,
//           { resource_type: "auto" },
//           (err, result) => {
//             if (err) {
//               console.log("error occurred");
//               reject(err);
//             } else {
//               console.log("assets uploaded");
//               uploadedRes.push(result);
//               resolve(result);
//             }
//           }
//         );
//       });
//     })
//   )
//     .then((result) => {
//       console.log(result);
//       return result;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

// module.exports = uploadFiles;


const cloudinary = require("cloudinary");
// const fs = require("fs");

// const uploadFiles = async (files) => {
//   console.log("upload started")
//   let uploadedRes = []
//   try {
//     const results = await Promise.all(Object.values(files).map(async (file) => {
//       return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.filepath,
//           { resource_type: "auto" },
//           (err, result) => {
//             if (err) {
//               console.log("error occurred")
//               reject(err);
//             } else {
//               console.log("asset uploaded")
//               uploadedRes.push(result)
//               resolve(result);
//             }
//           });
//       });
//     }));
//     console.log(results);
//     return results;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// module.exports = uploadFiles;

// const cloudinary = require("cloudinary");
const fs = require("fs");

const uploadFiles = async(files) => {
  console.log("upload started")
  let uploadedRes = []
  return Promise.all(Object.values(files).map((file) => {
    return new Promise((resolve, reject) => {
      try {
        cloudinary.uploader.upload(file.filepath, { resource_type: "auto" }, (err, result) => {
          if (err) {
            console.log("error occurred", err);
            reject(err);
          } else {
            console.log("assets uploaded")
            uploadedRes.push(result)
            resolve(result);
          }
        });
      } catch (err) {
        console.log("caught error:", err);
        reject(err);
      }
    });
  })).then((result) => {
    console.log(result);
    return result;
  }).catch((err) => {
    console.log(err);
    return err;
  });
};

module.exports = uploadFiles;


