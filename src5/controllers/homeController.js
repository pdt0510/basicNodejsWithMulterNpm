//src5
import * as db from '../config/connectDB';

export const getHomepage = (req, res) => {
  console.log(db.loadedDB);
  // 34ms57ss
  const data = db.loadedDB.map((item) => ({
    id: item.id,
    firstname: item.firstname,
    lastName: item.lastName,
    email: item.email,
    address: item.address,
  }));

  // 34ms57ss
  const stringifyUser = JSON.stringify(data);
  console.log('checking data type: ', typeof stringifyUser, stringifyUser);
  return res.render('test/index.ejs', { dataUser: stringifyUser });
};
