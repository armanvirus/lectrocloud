const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const CommetSchema = new Schema({
           comment:{type:String},
           user:{type:Object},
           reply:[{ttpe:Object}],
           images:[{ type: String }],
           files:[{ type: String }],
           likes:[{ type: String }],
           mainLight: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lights'
          },
           commentedOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("comments", commentSchema);
