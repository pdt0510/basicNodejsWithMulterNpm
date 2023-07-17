import * as apiController from '../controllers/APIController';
import express from 'express';

const router = express.Router();

const { apiUrls, getAllUsers, createNewUser, updateUser, deleteUser } =
  apiController;

const { v1ApiUrl, allUsersUrl, newUsersUrl, updateUserUrl, delUserUrl } =
  apiUrls;

const initAPIRoute = (app) => {
  router.get(allUsersUrl, getAllUsers);
  router.post(newUsersUrl, createNewUser);
  router.put(updateUserUrl, updateUser);
  router.delete(delUserUrl, deleteUser);
  console.log('api router - ', router);

  return app.use(v1ApiUrl, router);
};

export default initAPIRoute;
