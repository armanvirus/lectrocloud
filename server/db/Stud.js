const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const userSchema = new Schema({
           idNum:{type:String, required:true, unique:true},
           email:{type:String},
           phone:{type:String},
           password:{type:String, required:true},
           name:{type:String, required:true},
           level:{type:String, required:true},
           academicSession:{type:String, required:true},
           user:{type:String, required:false, 'default': 'student'},
           createdOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("Stud", userSchema);