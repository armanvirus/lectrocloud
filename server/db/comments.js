const mongoose = require("mongoose"),
      Schema = mongoose.Schema;


   const CommentSchema = new Schema({
           comment:{type:String},
           user:{type:Object},
           images:[{ type: String }],
           files:[{ type: String }],
           likes:[{ type: String }],
           reply:[{ type: Object }],
           lightId:{type:String,required:true},
           commentedOn:{ type: Date, 'default': Date.now }
        
      });


   module.exports = mongoose.model("comments", CommentSchema);