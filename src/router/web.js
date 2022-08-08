import express from 'express';
import homeController from '../controllers/homeController';
import multer from "multer";
import path from "path";
import appRoot from 'app-root-path';

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('checkAppRoot',appRoot + "/src/public/images");
    cb(null, appRoot + "/src/public/images");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});
const initialRouter = (app) => {
  router.get('/', homeController.homePage)
  router.get('/user/detail/:id', homeController.detailPage)
  router.post('/create-user', homeController.createUser)
  router.post('/delete-user', homeController.deleteUser)
  router.get('/edit-user/:id', homeController.editPage)
  router.post('/update-user', homeController.updateUser)
  router.get('/upload-file', homeController.getUploadFilePage)
  router.post('/upload-profile-pic',upload.single('profile_pic'),homeController.handleUploadFile)
  return app.use('/',router)
}

export default initialRouter;