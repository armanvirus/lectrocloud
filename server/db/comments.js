const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const CommetSchema = new Schema({
           comment:{type:String},
           user:{type:Object},
           images:[{ type: String }],
           files:[{ type: String }],
           likes:[{ type: String }],
           author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studs'
          },
           commentedOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("comments", commentSchema);