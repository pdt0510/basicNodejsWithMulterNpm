//src11
import pool from '../config/connectDB';

// 34ms31ss
import multer from 'multer';
import path from 'path';

const routes = {
  idParam: '/:id',
  homeUrl: '/',
  userDetailUrl: '/detail/user',
  newUserUrl: '/create-new-user',
  delUserUrl: '/delete/user',
  editUserUrl: '/edit/user',
  updateUserUrl: '/update/user',
  uploadFileUrl: '/upload', //15ms35ss
  handleUploadFileUrl: '/upload-profile-pic', //26ms32ss
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

// 15ms35ss
const uploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs');
};

// 34ms31ss
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

// 41ms09ss
const imageFilter1 = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    // 42ms26ss
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

//49ms02ss
const upload = multer().single('profile_pic');

// 48ms34ss
const handleUploadFile = (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // console.log(req.file); // 49ms02ss
    const imgLocal = '/image/'; // 50ms24ss

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="${
        imgLocal + req.file.filename
      }" width="500"><hr /><a href="./upload">Upload another image</a>`, //51ms12ss
    );
  });
};

// 26ms32ss
const handleUploadFile1 = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form, 38ms25ss
  const upload = multer({
    storage: storage,
    fileFilter: imageFilter, 
    // fileFilter: helpers.imageFilter,
  }).single('profile_pic');

  // 39ms29ss
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`,
    );
  });
};

export {
  routes,
  getHomepage,
  getDetailPage,
  createNewUserPage,
  delUserPage,
  editUserPage,
  updateUserPage,
  uploadFilePage,
  handleUploadFile,
};
