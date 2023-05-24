const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const resourceSchema = new Schema({
           title:{type:String},
           file:{ type: String },
           size:String,
           level:{type:String, required:true},
           likes:[String],
           academicSession:{type:String, required:true},
           author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studs'
          },
           lightOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("resource", resourceSchema);