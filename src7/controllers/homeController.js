//src7,
import pool from '../config/connectDB';

const getHomepage = async (req, res) => {
  // 11ms35ss, 14ms14ss
  const [data, fields] = await pool.execute('SELECT * FROM users');
  // console.log('checking data: ', data);

  /* 22ms11ss */
  // const check = await pool.execute('SELECT * FROM users');
  // console.log('checking a Destructuring: ', check);

  return res.render('index.ejs', { dataUser: data });
};

const getDetailPage = async (req, res) => {
  const id = req.params.id;
  const table = 'users';
  const col = 'id';
  const [user] = await pool.execute(
    // 36ms26ss
    `select * from ${table} where ${col} = ?`,
    [id],
  );

  /* 36ms26ss, JSON string */
  return res.send(JSON.stringify(user));
};

// 28ms37ss
const getDetailPage2 = async (req, res) => {
  // 33ms49ss
  const id = req.params.id;
  const [user, ...fields] = await pool.execute(
    `select * from users where id = ${id}`,
  );
  console.log('checking user param: ', user);

  // 31ms09ss, 32ms39ss
  console.log('checking req param: ', req.params);

  // 28ms37ss
  return res.send('hello getDetailPage');
};

export { getHomepage, getDetailPage };
