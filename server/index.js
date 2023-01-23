const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const db = require("./utils/connectDb");
const logs = require("./controllers/log")
const bodyParser = require('body-parser');
const cors = require("cors")
const verifiedData = require('./utils/verify');
const light = require("./db/lights")
const Studs = require("./db/Stud")
const comments = require("./controllers/commentsController")
const interactions = require('./controllers/interactions')
const search = require('./controllers/search')
const multer = require('multer')
const claudinary = require("cloudinary").v2;





db();

console.log(process.env.CLOUDINARY_URL)

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cors({
  credentials:true,
  origin:process.env.CLIENT_URI}));
  app.get('/', (req, res) => {
    verifiedData(req,res)
  })
  // config claudinar
  // claudinary.config({
  //   claud_name:process.env.CLAUD_NAME,
  //   api_key:process.env.API_KEY,
  //   api_secret:process.env.API_SECRET
  // })

  
  app.use(express.static('../uploads'))

  
  const upload = multer({
    dest: '../uploads/',
    limits: {
      fileSize: 100 * 1024 * 1024 // 100 MB
    }
  })
  

// Set up a route for handling login/sign requests
app.post('/sign', logs.sign )
app.post('/login', logs.login )
// route to check if the user exist before creating account
app.post('/user/check', logs.check);

//handling reaction button
app.post('/user/reaction', interactions.reaction)
//comment route
app.post('/user/comment', comments.comments)
app.get('/user/comment/:id', comments.getComments)
// reply to a comment
app.post('/user/reply', comments.doReply)
// handle search
app.post('/user/search', search.search)
// route to make an upload
app.post('/user/light',(req,res)=>{
  const {user, image, notes} = req.body;
  var imgUrl, fileUrl;
  if(user){

    jwt.verify(user, process.env.JWT_KEY, (error, decodedUser) => {
      if (error) {
        console.log(error)
        res.send(error)
      } else {
        if(image){
        }
        claudinary.uploader.upload(image,{
          use_filename: true, 
          unique_filename: false,
          folder:"lectrocloud_post" },(err,result)=>{
            if(err){
              //send the err
              res.send(err)
            }else{
              //save the post
              const newlight = new light({
                user:{username:decodedUser.name},
                note:notes,
                images:[image && (result.url)],
                files:[""],
                likes:[""],
                level:decodedUser.level,
                academicSession:decodedUser.academicSession,
                author:decodedUser.id
              })
              newlight.save((saveErr,saveUser)=>{
                res.send(saveUser)
              })
            }
          })
          // console.log(foundUser)
          
          
       
      }
  })
  }
})









const PORT = process.env.PORT || 3300
app.listen(PORT , () => {
  console.log(`Server listening on port ${PORT}`)
})
