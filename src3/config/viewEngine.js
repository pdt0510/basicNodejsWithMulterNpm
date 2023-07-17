//src3
import express from 'express';
const configViewEngine = (app) => {
  //11ms31ss, 15ms05ss
  app.use(express.static('./src/public'));
  // app.use(express.static('public'));

  app.set('view engine', 'ejs');
  app.set('views', './src/views');
};

export default configViewEngine;
