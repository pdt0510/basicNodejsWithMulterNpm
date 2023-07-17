// src11
import * as controller from '../controllers/homeController';
import express from 'express';

// 48ms34ss
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path'; //51ms42ss

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// 51ms42ss
		console.log('checking appRoot path: ', appRoot);
		cb(null, appRoot + '/src/public/image/');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const imageFilter = function (req, file, callback) {
	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		req.fileValidationError = 'Only image files are allowed!'; //42ms26ss
		return callback(new Error('Only image files are allowed!'), false);
	}
	callback(null, true);
};

// 54ms10ss
const upload = multer({
	storage: storage,
	fileFilter: imageFilter,
});

const router = express.Router();
const initWebRoute = (app) => {
	const {
		routes,
		getHomepage,
		getDetailPage,
		createNewUserPage,
		delUserPage,
		editUserPage,
		updateUserPage,
		uploadFilePage,
		handleUploadFile,
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
	} = routes;

	router.get(homeUrl, getHomepage);
	router.get(userDetailUrl + idParam, getDetailPage);
	router.post(newUserUrl, createNewUserPage);
	router.post(delUserUrl + idParam, delUserPage);
	router.get(editUserUrl + idParam, editUserPage);
	router.post(updateUserUrl + idParam, updateUserPage);
	router.get(uploadFileUrl, uploadFilePage); //15ms35ss
	// router.post(handleUploadFileUrl, handleUploadFile); //26ms32ss

	/* 48ms34ss */
	router.post(handleUploadFileUrl, upload.single('profile_pic'), handleUploadFile);

	return app.use(homeUrl, router);
};

export default initWebRoute;
