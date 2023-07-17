import mysql from 'mysql2';

const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  database: 'nodejsbasic',
});

let loadedDB = null;

connection.query('SELECT * FROM `users`', function (err, results, fields) {
  console.log('db running ....');
  loadedDB = Object.values(JSON.parse(JSON.stringify(results)));
});

export { loadedDB };
