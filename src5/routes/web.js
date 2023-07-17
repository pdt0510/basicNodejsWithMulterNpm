//src5
import * as controller from '../controllers/homeController';
import express from 'express';

const router = express.Router();

const initWebRoute = (app) => {
  router.get('/', controller.getHomepage);

  router.get('/about', (req, res) => {
    res.send('Phan Duc Tai');
  });

  return app.use('/', router);
};

export default initWebRoute;
