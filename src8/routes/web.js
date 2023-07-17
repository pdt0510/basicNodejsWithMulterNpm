import * as controller from '../controllers/homeController';
import express from 'express';

const router = express.Router();

const initWebRoute = (app) => {
  const { getHomepage, getDetailPage, createNewUserPage } = controller;
  const { homePageUrl, userDetailUrl, newUserUrl } = controller.routes;

  // v13xx1
  router.get(homePageUrl, getHomepage);
  router.get(userDetailUrl, getDetailPage);
  router.post(newUserUrl, createNewUserPage); // 19ms04ss
  return app.use(homePageUrl, router);
};

export default initWebRoute;
