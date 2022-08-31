const routesUsers = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/celebrate');

routesUsers.get('/me', getUser);
routesUsers.patch('/me', validateUpdateUser, updateUser);

module.exports = routesUsers;
