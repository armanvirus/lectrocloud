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
        req.body = fields;
        req.files = files;
        next();
      }
    });
  } else {
    next();
  }
}