import * as controller from '../controllers/homeController';
import express from 'express';
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';

// src12
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

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

const router = express.Router();
const initWebRoute = (app) => {
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

  //upload single pic/file
  router.post(
    handleUploadFileUrl,
    upload.single(singleFileName),
    handleUploadFile,
  );

  //upload multiple pics/files,
  const maxFiles = 2;
  router.post(
    handleMutilUploadFileUrl,
    upload.array(multipleFileName, maxFiles), //v17xx2
    handleMutilUploadFiles,
  );

  return app.use(homeUrl, router);
};

export default initWebRoute;
