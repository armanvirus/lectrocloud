const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const resourceSchema = new Schema({
           title:{type:String},
           files:[{ type: String }],
           level:{type:String, required:true},
           academicSession:{type:String, required:true},
           author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studs'
          },
           lightOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("resource", resourceSchema);