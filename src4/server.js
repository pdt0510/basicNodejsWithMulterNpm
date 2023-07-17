import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web'; //13ms35ss
import express from 'express';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();
configViewEngine(app);

// init routes, 13ms35ss,
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
