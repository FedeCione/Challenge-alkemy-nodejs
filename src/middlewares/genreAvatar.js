let multer = require("multer");
let path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/genres'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const fileFilter = function(req, file,callback) {
  if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      req.fileValidationError = "Sólo imágenes (.jpg | .jpeg | .png)";
      return callback(null,false,req.fileValidationError);
  }
  callback(null,true);
}

let uploadFile = multer({ storage, fileFilter });

module.exports = uploadFile;