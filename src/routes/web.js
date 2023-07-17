import * as controller from '../controllers/homeController';
import express from 'express';
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { imagePath } = controller.localPaths;
    cb(null, appRoot + imagePath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const initWebRoute = (app) => {
  const router = express.Router();
  const maxFiles = 5;

  const {
    routes,
    names,
    getHomepage,
    getDetailPage,
    createNewUserPage,
    delUserPage,
    editUserPage,
    updateUserPage,
    uploadFilePage,
    handleUploadFile,
    handleMutilUploadFiles,
  } = controller;

  const {
    idParam,
    homeUrl,
    userDetailUrl,
    newUserUrl,
    delUserUrl,
    editUserUrl,
    updateUserUrl,
    uploadFileUrl,
    handleUploadFileUrl,
    handleMutilUploadFileUrl,
  } = routes;

  const { singleFileName, multipleFileName } = names;

  router.get(homeUrl, getHomepage);
  router.get(userDetailUrl + idParam, getDetailPage);
  router.post(newUserUrl, createNewUserPage);
  router.post(delUserUrl + idParam, delUserPage);
  router.get(editUserUrl + idParam, editUserPage);
  router.post(updateUserUrl + idParam, updateUserPage);
  router.get(uploadFileUrl, uploadFilePage);
  router.post(
    handleUploadFileUrl,
    upload.single(singleFileName),
    handleUploadFile,
  );
  router.post(
    handleMutilUploadFileUrl,
    upload.array(multipleFileName, maxFiles),
    handleMutilUploadFiles,
  );

  console.log('web router - ', router);
  return app.use(homeUrl, router);
};

export default initWebRoute;
