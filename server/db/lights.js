const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const lightSchema = new Schema({
           note:{type:String},
           user:{type:Object},
           images:[{ type: String }],
           files:[{ type: String }],
           likes:[{ type: String }],
           level:{type:String, required:true},
           academicSession:{type:String, required:true},
           author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studs'
          },
           lightOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("light", lightSchema);