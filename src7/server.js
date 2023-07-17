import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import express from 'express';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();
configViewEngine(app);

// init routes
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
