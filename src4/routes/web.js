//src4, 9ms29ss
import express from 'express';

// 20ms01ss
import * as controller from '../controllers/homeController';

//9ms29ss
const router = express.Router();

// 9ms29ss
const initWebRoute = (app) => {
  // 20ms01ss
  router.get('/', controller.getHomepage);

  /* 12ms44ss */
  // router.get('/', (req, res) => {
  //   res.render('index.ejs');
  // });

  /* 12ms44ss */
  router.get('/about', (req, res) => {
    res.send('Phan Duc Tai');
  });

  return app.use('/', router);
  // return app.use('/abc', router); //16ms06ss
};

export default initWebRoute;
