import multer from "multer";
import appRoot from "app-root-path";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("checkAppRoot", appRoot.path);
    cb(null, appRoot.path + "/src/public/images");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload2 = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("profile_multiple_pic", 3);
const middleware = {
  uploadFile: async (req, res, next) => {
    upload2(req, res, (err) => {
      if (
        err instanceof multer.MulterError &&
        err.code === "LIMIT_UNEXPECTED_FILE"
      ) {
        res.send("LIMIT_UNEXPECTED_FILE");
      } else if (err) {
        res.send(err);
      } else {
        next();
      }
    });
  },
};

export { middleware };
