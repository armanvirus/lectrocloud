const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const db = require("./server/utils/connectDb");
const logs = require("./server/controllers/log")
const bodyParser = require('body-parser');
const cors = require("cors")
const verifiedData = require('./server/utils/verify');
const light = require("./server/db/lights")
const Studs = require("./server/db/Stud")
const comments = require("./server/controllers/commentsController")
const interactions = require('./server/controllers/interactions')
const search = require('./server/controllers/search')
const multer = require('multer')
const claudinary = require("cloudinary").v2;
const parseToken = require("./server/utils/parseToken")
const randomLights = require("./server/utils/randomLights")
const lightsObj = require("./server/utils/getCommentCount");
const resources = require("./server/controllers/resources")
// const parseFiles = require("./server/middlewares/parseFiles")





db();

// console.log(process.env.CLOUDINARY_URL)

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(parseFiles)

app.use(cors({
  credentials:true,
  origin:process.env.CLIENT_URI}));
  
  app.get('/', (req, res) => {
    verifiedData(req,res)
  })


  
  app.use(express.static('../uploads'))

  
  const upload = multer()
  

// Set up a route for handling login/sign requests
app.post('/sign', logs.sign )
app.post('/login', logs.login )
// route to check if the user exist before creating account
app.post('/user/check', logs.check);
app.post('/user/resources', upload.array('resource[]'),resources.add)
app.get('/resource/get', resources.get)
app.post('/resource/reaction', resources.reaction)
// app.post('/s/comment')
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
app.post('/user/light',async(req,res)=>{
  const {image, notes} = req.body;
  const user = await parseToken(req);
  if(!user)
    return res.json({status:401, msg:"please login"});
  let uploadedimg ;
  if(image){
    const result = await  claudinary.uploader.upload(image,{
      use_filename: true, 
      unique_filename: false,
      folder:"lectrocloud_post" });
      uploadedimg = result
  }
      // console.log(foundUser)
      const newlight = new light({
        user:{username:user.name},
        note:notes,
        images:[image && (uploadedimg.url)],
        files:[""],
        likes:[""],
        level:user.level,
        academicSession:user.academicSession,
        author:user.id
      })
      newlight.save((saveErr,saveUser)=>{
        if(saveErr) console.log(err);
        res.send(saveUser)
      })

})

app.get("/user/profile",async(req,res)=>{
  const requiredEntry = require("./server/utils/lights_constants")()
  const token = await parseToken(req);
  if(!token){
    return res.json({ code: 401, msg: "authentication failed" })
  }

  try{
    const student = await Studs.findOne({_id:token.id},"_id idNum name level academicSession")
    const lights = await light.find({author:token.id})
    .sort("-lightOn")
    .limit(10)
    .select(requiredEntry)
    lighsObjv2 = await lightsObj(lights)
    user = {student, lights:lighsObjv2}
    res.status(200)
    .json(user)
  }catch(err){
    res.status(501).json({msg:"server error"})
    console.log(err)
  }
  // res.send(token)
})







const PORT = process.env.PORT || 3300
app.listen(PORT , () => {
  console.log(`Server listening on port ${PORT}`)
})
