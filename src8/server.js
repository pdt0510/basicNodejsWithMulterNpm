//src8, 10ms54ss
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import 'dotenv/config';

const port = process.env.PORT || 8080;
const app = express();

// 10ms54ss
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
