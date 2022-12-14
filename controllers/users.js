const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

const ErrorBadRequest = require('../utils/errors/bad-request'); // 400
const ErrorUnauthorized = require('../utils/errors/unauthorized'); // 401
const ErrorConflict = require('../utils/errors/conflict'); // 409

const messages = require('../utils/messages');

const SALT_ROUNDS = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, Number(SALT_ROUNDS))
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => res.status(201).send({
          email: user.email,
          name: user.name,
          password: user.password,
        }))
        .catch((error) => {
          if (error.name === 'MongoServerError' || error.code === 11000) {
            next(new ErrorConflict(messages.errorsMessages.emailConflict));
          } else if (error.name === 'ValidationError') {
            next(new ErrorBadRequest(messages.errorsMessages.invalidUserData));
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

const authUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.status(200).send({ token });
        } else {
          next(new ErrorUnauthorized(messages.errorsMessages.wrongAuth));
        }
      });
    })
    .catch(() => {
      next(new ErrorUnauthorized(messages.errorsMessages.wrongAuth));
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход.' });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((error) => {
      if (error.name === 'MongoServerError' || error.code === 11000) {
        next(new ErrorConflict(messages.errorsMessages.emailConflict));
      } else if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(messages.errorsMessages.invalidUserData));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  authUser,
  logout,
  getUser,
  updateUser,
};
