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
const interactions = require('./controllers/interactions')
const multer = require('multer')



db();

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'}));
  app.get('/', (req, res) => {
    verifiedData(req,res)
  })

  app.use(express.static('../uploads'))

  
  const upload = multer({
    dest: '../uploads/',
    limits: {
      fileSize: 100 * 1024 * 1024 // 100 MB
    }
  })
  
// Set up a secret key for signing JWTs
const JWT_SECRET = 'your-secret-key'

// Set up a route for handling login/sign requests
app.post('/sign', logs.sign )
app.post('/login', logs.login )
// route to check if the user exist before creating account
app.post('/user/check', logs.check);

//handling reaction button
app.post('/user/reaction', interactions.reaction)

// route to make an upload
app.post('/user/light',(req,res)=>{
  const {user, image, notes} = req.body;
  if(user){

    jwt.verify(user, "JWT_SECRET", (error, decodedUser) => {
      if (error) {
        console.log(error)
        res.send(error)
      } else {
        
          // console.log(foundUser)
          const newlight = new light({
            user:{username:decodedUser.name},
            note:notes,
            images:[image],
            files:[""],
            likes:[""],
            level:decodedUser.level,
            academicSession:decodedUser.academicSession,
            author:decodedUser.id
          })
          newlight.save((saveErr,saveUser)=>{
            res.send(newlight)
          })
          
       
      }
  })
  }
})










app.listen(3300, () => {
  console.log('Server listening on port 3300')
})
