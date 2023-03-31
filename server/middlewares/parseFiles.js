const formidable = require('formidable');

const form =new  formidable.IncomingForm({
  encoding:"utf-8",
  multiples:true,
  keepExtensions:true,});

module.exports = (req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
      } else {
        
        const output = files['resource[]'].map(file => {
          return {
            ...file
          };
        });
        req.body = fields;
        req.files = output
        // console.log(req.files)
        next();
      }
    });
  } else {
    next();
  }
}