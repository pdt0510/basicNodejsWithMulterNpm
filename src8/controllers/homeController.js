import pool from '../config/connectDB';

// src8, v13xx1
const routes = {
  homePageUrl: '/',
  userDetailUrl: '/detail/user/:id',
  newUserUrl: '/create-new-user',
};

// v13xx1
const sqlManager = {
  table: 'users',
  idCol: 'id',
  fNameCol: 'firstName',
  lNameCol: 'lastName',
  emailCol: 'email',
  addressCol: 'address',
};

const getHomepage = async (req, res) => {
  const [data, fields] = await pool.execute('SELECT * FROM users');

  return res.render('index.ejs', {
    dataUser: data,
    newUserUrl: routes.newUserUrl, //v13xx2
  });
};

const getDetailPage = async (req, res) => {
  const id = req.params.id;
  const { table, idCol } = sqlManager;

  const [user] = await pool.execute(
    `select * from ${table} where ${idCol} = ?`,
    [id],
  );
  return res.send(JSON.stringify(user));
};

// 19ms04ss
const createNewUserPage = async (req, res) => {
  // 22ms07ss
  console.log('checking req.body: ', req.body);

  // 27ms52ss
  const { firstName, lastName, email, address } = req.body;
  const { table, fNameCol, lNameCol, emailCol, addressCol } = sqlManager;

  // 27ms52ss
  await pool.execute(
    `insert into ${table} (${fNameCol}, ${lNameCol}, ${emailCol}, ${addressCol})
     value (?, ?, ?, ?)`,
    [firstName, lastName, email, address],
  );

  // 32ms28ss
  return res.redirect('/');
  // return res.send('calling createNewUser page');
};

export { routes, getHomepage, getDetailPage, createNewUserPage };
