//src5, 25ms37ss
// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic', //26ms47ss
});

let loadedDB = null;

// simple query, 27ms28ss
connection.query('SELECT * FROM `users`', function (err, results, fields) {
  console.log('db running ....');

  //29ms31ss
  // console.log('db string types: ', results);

  // 30ms26ss
  loadedDB = Object.values(JSON.parse(JSON.stringify(results)));
  console.log('removed textrow - js types: ', loadedDB);
});

// 28ms12ss
export { loadedDB };
