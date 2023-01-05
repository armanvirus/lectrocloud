const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const db = require("./utils/connectDb");
const logs = require("./controllers/log")
const bodyParser = require('body-parser');
const cors = require("cors")
const verifiedData = require('./utils/verify')

db();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'}));
app.get('/', (req, res) => {
  verifiedData(req,res)
})


// Set up a secret key for signing JWTs
const JWT_SECRET = 'your-secret-key'

// Set up a route for handling login/sign requests
app.post('/sign', logs.sign )
app.post('/login', logs.login )
// route to check if the user exist before creating account
app.post('/user/check', logs.check)

// Set up a route for handling authenticated requests
app.get('/protected', (req, res) => {
  // Check for the presence of an Authorization header with a valid JWT
  const token = req.headers.authorization
  if (token) {
    // If the JWT is valid, allow the request to continue
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        // If the JWT is invalid, send a 401 Unauthorized status code
        res.sendStatus(401)
      } else {
        // If the JWT is valid, send the decoded user information to the client
        res.json(decoded)
      }
    })
  } else {
    // If the request does not include a valid JWT, send a 401 Unauthorized status code
    res.sendStatus(401)
  }
})








app.listen(3300, () => {
  console.log('Server listening on port 3300')
})
