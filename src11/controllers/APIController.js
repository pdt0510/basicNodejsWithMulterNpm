import pool from '../config/connectDB';

const apiUrls = {
  v1ApiUrl: '/api/v1/',
  allUsersUrl: '/users',
  newUsersUrl: '/create-new-user',
  updateUserUrl: '/update/user/:id',
  delUserUrl: '/delete/user/:id',
};

const sqlManager = {
  usersTable: 'users',
  idCol: 'id',
  fNameCol: 'firstName',
  lNameCol: 'lastName',
  emailCol: 'email',
  addressCol: 'address',
};

const getAllUsers1 = (req, res) => {
  return res.status(200).json({
    message: 'ok',
  });
};

const getAllUsers = async (req, res) => {
  const { usersTable } = sqlManager;
  const [rows] = await pool.execute(`select * from ${usersTable} `);
  return res.status(200).json({
    message: 'ok',
    data: rows,
  });
};

const createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const { usersTable, fNameCol, lNameCol, emailCol, addressCol } = sqlManager;

  if (!firstName | !lastName || !email || !address) {
    return res.status(422).json({
      message: 'missing required fields',
    });
  }

  await pool.execute(
    `insert into ${usersTable} (${fNameCol}, ${lNameCol}, ${emailCol}, ${addressCol})
     value (?, ?, ?, ?)`,
    [firstName, lastName, email, address],
  );

  return res.status(200).json({
    message: 'successfully posted',
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, address } = req.body;
  const { idCol, usersTable, fNameCol, lNameCol, emailCol, addressCol } =
    sqlManager;

  if (!firstName | !lastName || !email || !address) {
    return res.status(422).json({
      message: 'missing required fields',
    });
  }

  await pool.execute(
    `update ${usersTable} set ${fNameCol} = ?, ${lNameCol} = ?, ${emailCol} = ?, ${addressCol} = ? where ${idCol} = ?`,
    [firstName, lastName, email, address, id],
  );

  return res.status(200).json({
    message: 'successfully updated',
    data: req.body,
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { usersTable, idCol } = sqlManager;
  await pool.execute(`DELETE FROM ${usersTable} WHERE ${idCol} = ?`, [id]);

  return res.status(200).json({
    message: 'successfully deleted',
  });
};

export {
  apiUrls,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
