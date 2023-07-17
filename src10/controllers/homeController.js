import pool from '../config/connectDB';

const routes = {
  idParam: '/:id',
  homeUrl: '/',
  userDetailUrl: '/detail/user',
  newUserUrl: '/create-new-user',
  delUserUrl: '/delete/user',
  editUserUrl: '/edit/user',
  updateUserUrl: '/update/user',
};

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
  const { userDetailUrl, newUserUrl, delUserUrl, editUserUrl } = routes;

  return res.render('index.ejs', {
    dataUser: data,
    userDetailUrl,
    newUserUrl,
    delUserUrl,
    editUserUrl,
  });
};

const getDetailPage = async (req, res) => {
  const id = +req.params.id;
  const { table, idCol } = sqlManager;

  if (isNaN(id)) {
    return res.end();
  }

  const [user] = await pool.execute(
    `select * from ${table} where ${idCol} = ?`,
    [id],
  );

  return res.send(JSON.stringify(user));
};

const createNewUserPage = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const { table, fNameCol, lNameCol, emailCol, addressCol } = sqlManager;
  const { homeUrl } = routes;

  await pool.execute(
    `insert into ${table} (${fNameCol}, ${lNameCol}, ${emailCol}, ${addressCol})
     value (?, ?, ?, ?)`,
    [firstName, lastName, email, address],
  );

  return res.redirect(homeUrl);
};

const delUserPage = async (req, res) => {
  const id = +req.params.id;
  const { table, idCol } = sqlManager;
  const { homeUrl } = routes;

  await pool.execute(`DELETE FROM ${table} WHERE ${idCol} = ?`, [id]);

  return res.redirect(homeUrl);
};

const editUserPage = async (req, res) => {
  const id = +req.params.id;
  const { table, idCol } = sqlManager;
  const { homeUrl, updateUserUrl } = routes;

  if (isNaN(id)) {
    return res.end();
  }

  const [user] = await pool.execute(
    `select * from ${table} where ${idCol} = ?`,
    [id],
  );

  return res.render('update.ejs', {
    editingUser: user[0],
    homeUrl,
    updateUserUrl,
  });
};

const updateUserPage = async (req, res) => {
  const { homeUrl } = routes;
  const { id, firstName, lastName, email, address } = req.body;
  const { idCol, table, fNameCol, lNameCol, emailCol, addressCol } = sqlManager;

  await pool.execute(
    `update ${table} set ${fNameCol} = ?, ${lNameCol} = ?, ${emailCol} = ?, ${addressCol} = ? where ${idCol} = ?`,
    [firstName, lastName, email, address, id],
  );

  return res.redirect(homeUrl);
};

export {
  routes,
  getHomepage,
  getDetailPage,
  createNewUserPage,
  delUserPage,
  editUserPage,
  updateUserPage,
};
