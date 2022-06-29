const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        console.log('file',file);
        cb(null,'src/public/img')
      }
      else{
        cb(new Error('This is not a image',false))
      }
    },
    filename: function (req, file, cb) {
      console.log(file.fieldname + '-' + Date.now()+'.jpg');
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
  })
   
  var upload = multer({ storage: storage })

  module.exports = upload;