import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import initAPIRoute from './routes/api';
import 'dotenv/config';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
