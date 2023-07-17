import * as controller from '../controllers/homeController';
import express from 'express';

const router = express.Router();

//src9
const initWebRoute = (app) => {
  const {
    getHomepage,
    getDetailPage,
    createNewUserPage,
    delUserPage,
    editUserPage,
    updateUserPage,
  } = controller;

  const {
    idParam,
    homeUrl,
    userDetailUrl,
    newUserUrl,
    delUserUrl,
    editUserUrl,
    updateUserUrl,
  } = controller.routes;

  router.get(homeUrl, getHomepage);
  router.get(userDetailUrl + idParam, getDetailPage);
  router.post(newUserUrl, createNewUserPage);

  //7ms39ss, 11ms23ss
  router.post(delUserUrl + idParam, delUserPage);

  //18ms28ss
  router.get(editUserUrl + idParam, editUserPage);

  // 28ms40ss
  router.post(updateUserUrl + idParam, updateUserPage);
  return app.use(homeUrl, router);
};

export default initWebRoute;
