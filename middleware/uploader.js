const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "blogImage/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const iamgeName = uniqueSuffix + "-" + file.originalname;
    req.imageName = iamgeName;
    cb(null, iamgeName);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /jpg|png/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Image must be a jpg or png formate"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
