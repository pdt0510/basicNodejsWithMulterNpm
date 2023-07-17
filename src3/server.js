//src3
import configViewEngine from './config/viewEngine';
import express from 'express';

//4ms45ss,
import 'dotenv/config'; // es6+
// require('dotenv').config(); //es5

const port = process.env.PORT || 3000; //8ms10ss
console.log('checking the port:', port);

const app = express(); // 3ms08ss
configViewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
