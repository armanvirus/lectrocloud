const lights = require("../db/lights");
module.exports = {
    search:(req,res)=>{
        const keyword = req.body.keyword
        lights.find({ note: new RegExp(keyword, "i") }, function (err, docs) {
            res.send(docs)
            // docs is an array of documents that match the query
          });
    }
}