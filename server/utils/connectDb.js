const mongoose = require('mongoose');

const db = ()=>{
    // Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/lectrocloud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.log(error))
}


module.exports = db;