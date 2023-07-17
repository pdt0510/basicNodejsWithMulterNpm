//src2, server1
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.get('/', (req, res) => {
  res.send('Hello World! 123');
});

app.get('/about', (req, res) => {
  res.send('Phan Duc Tai');
});

app.get('/html', (req, res) => {
  // 49ss
  res.sendFile(path.join(__dirname, '/index.html'));

  /* v07xx1, way 1 */
  // res.sendFile(
  //   path.join(
  //     'D:\\LEARNING__________\\21.NodeJsCoBan-HoiDanIT\\basicNodejs\\src',
  //     '/index.html',
  //   ),
  // );

  /* v07xx1, way 2 */
  // res.sendFile(
  //   path.join(
  //     'D:/LEARNING__________/21.NodeJsCoBan-HoiDanIT/basicNodejs/src',
  //     '/index.html',
  //   ),
  // );
});

// v07xx2
app.use(express.static('test'));
app.use(express.static('test2'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
