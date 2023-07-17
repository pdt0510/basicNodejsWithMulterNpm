import * as db from '../config/connectDB';

export const getHomepage = (req, res) => {
  const data = db.loadedDB.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    address: item.address,
  }));

  // 22ms37ss
  return res.render('index.ejs', { dataUser: data });
};
