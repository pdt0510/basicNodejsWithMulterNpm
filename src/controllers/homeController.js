import pool from '../config/connectDB';
import multer from 'multer';

const names = {
  singleFileName: 'profile_pic',
  multipleFileName: 'multiple_profile_pic',
};

const localPaths = {
  imageFolder: '/image/',
  imagePath: '/src/public/image/',
};

const routes = {
  idParam: '/:id',
  homeUrl: '/',
  userDetailUrl: '/detail/user',
  newUserUrl: '/create-new-user',
  delUserUrl: '/delete/user',
  editUserUrl: '/edit/user',
  updateUserUrl: '/update/user',
  uploadFileUrl: '/upload',
  handleUploadFileUrl: '/upload-profile-pic',
  handleMutilUploadFileUrl: '/upload-mutilple-profile-pic',
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
  const {
    homeUrl,
    userDetailUrl,
    newUserUrl,
    delUserUrl,
    editUserUrl,
    uploadFileUrl,
  } = routes;

  return res.render('index.ejs', {
    dataUser: data,
    homeUrl,
    userDetailUrl,
    newUserUrl,
    delUserUrl,
    editUserUrl,
    uploadFileUrl,
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

const uploadFilePage = async (req, res) => {
  const {
    homeUrl,
    uploadFileUrl,
    handleUploadFileUrl,
    handleMutilUploadFileUrl,
  } = routes;
  const { singleFileName, multipleFileName } = names;

  return res.render('uploadFile.ejs', {
    homeUrl,
    uploadFileUrl,
    handleUploadFileUrl,
    handleMutilUploadFileUrl,
    singleFileName,
    multipleFileName,
  });
};

const handleUploadFile = (req, res) => {
  const singleFileValidtion = multer().single(names.singleFileName);

  singleFileValidtion(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    res.send(
      `You have uploaded this image: <hr/><img src="${
        localPaths.imageFolder + req.file.filename
      }" width="500"><hr /><a href="${
        routes.uploadFileUrl
      }">Upload another image</a>`,
    );
  });
};

const handleMutilUploadFiles = (req, res) => {
  const multiFilesValidtion = multer().single(names.multipleFileName);

  multiFilesValidtion(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    const imgfiles = req.files;
    const imgLength = imgfiles.length;
    let result = `You have uploaded ${
      imgLength > 1 ? `these ${imgLength} images` : `this image`
    } : <hr />`;

    for (let idx = 0; idx < imgLength; ++idx) {
      result += `<img src="${
        localPaths.imageFolder + imgfiles[idx].filename
      }" width="300" style="margin-right: 20px;">`;
    }

    result += `<br/><a href="${routes.uploadFileUrl}">Upload other images</a>`;

    res.send(result);
  });
};

export {
  routes,
  names,
  localPaths,
  getHomepage,
  getDetailPage,
  createNewUserPage,
  delUserPage,
  editUserPage,
  updateUserPage,
  uploadFilePage,
  handleUploadFile,
  handleMutilUploadFiles,
};
