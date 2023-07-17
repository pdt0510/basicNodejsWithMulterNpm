import * as controller from '../controllers/homeController';
import express from 'express';

const router = express.Router();

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
  router.post(delUserUrl + idParam, delUserPage);
  router.get(editUserUrl + idParam, editUserPage);
  router.post(updateUserUrl + idParam, updateUserPage);
  return app.use(homeUrl, router);
};

export default initWebRoute;
