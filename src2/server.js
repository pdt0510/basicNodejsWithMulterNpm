//src2, server2, 29ms07ss
import configViewEngine from './config/viewEngine';

import express from 'express';
const app = express();
const port = 8080;

// 29ms07ss
configViewEngine(app);

// 30ms37ss
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
