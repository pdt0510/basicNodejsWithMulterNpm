//src7
import * as controller from '../controllers/homeController';
import express from 'express';

const router = express.Router();

const initWebRoute = (app) => {
  router.get('/', controller.getHomepage);

  // 28ms37ss
  router.get('/detail/user/:id', controller.getDetailPage);

  // 32ms39ss
  // router.get('/detail/user/:id/:name', controller.getDetailPage);

  return app.use('/', router);
};

export default initWebRoute;
