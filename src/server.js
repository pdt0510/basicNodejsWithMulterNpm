// src13
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import initAPIRoute from './routes/api';
import morgan from 'morgan';
import 'dotenv/config';

const port = process.env.PORT || 8080;
const app = express();

// 25ms21ss
app.use((req, res, next) => {
	console.log('checking my middleware');
	console.log('req.method');
	next(); //28ms34ss
});

app.use(morgan('combined')); // 21ms02ss

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);

// 11ms57ss
app.use((req, res) => {
	res.render('404.ejs');
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
