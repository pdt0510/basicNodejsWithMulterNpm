// 5ms50ss
const express = require('express');
const app = express();

// 9ms28ss
const port = 8080;
// const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! 123');
});

// 13ms05ss
app.get('/about', (req, res) => {
  res.send('Phan Duc Tai');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
