//src10, 20ms30ss, 22ms11ss
import * as apiController from '../controllers/APIController';
import express from 'express';

const router = express.Router();

const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  apiVersions,
  apiUrls,
} = apiController;
const { v1ApiUrl } = apiVersions;
const { allUsersUrl, newUsersUrl, updateUserUrl, delUserUrl } = apiUrls;

const initAPIRoute = (app) => {
  router.get(allUsersUrl, getAllUsers); // 22ms11ss
  router.post(newUsersUrl, createNewUser); //36ms37ss
  router.put(updateUserUrl, updateUser); //46ms10ss
  router.delete(delUserUrl, deleteUser); //v15xx1

  return app.use(v1ApiUrl, router); // 21ms48ss
};

export default initAPIRoute;
