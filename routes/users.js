const routesUsers = require('express').Router();

const {
  getUser,
} = require('../controllers/users');

routesUsers.get('/me', getUser);

module.exports = routesUsers;
