// const cloudinary = require("cloudinary");
const fs = require("fs");

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


// Define the paths of the files you want to upload
const filePaths = [
  
];

// Create an empty array to hold the uploaded file URLs
const uploadedFileUrls = [];

// Define an async function to upload each file to Cloudinary
const uploadFiles = async () => {
  // Loop through the file paths and upload each file to Cloudinary
  for (const filePath of filePaths) {
    // Read the file from disk
    const file = fs.readFileSync(filePath);

    // Upload the file to Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(file, { folder: 'YOUR_FOLDER_NAME' });
    console.log(secure_url);
    uploadedFileUrls.push(secure_url);
  }

  // Log the array of uploaded file URLs
  console.log(uploadedFileUrls);
};

// Call the uploadFiles function to start the uploads
uploadFiles();



