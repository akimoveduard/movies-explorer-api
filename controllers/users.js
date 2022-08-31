const bcrypt = require('bcrypt');

const User = require('../models/user');
const getJwtToken = require('../utils/jwt');

const ErrorBadRequest = require('../utils/errors/bad-request'); // 400
const ErrorUnauthorized = require('../utils/errors/unauthorized'); // 401
const ErrorConflict = require('../utils/errors/conflict'); // 409

const SALT_ROUNDS = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  if (password) {
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
          }))
          .catch((error) => {
            if (error.name === 'MongoServerError' || error.code === 11000) {
              next(new ErrorConflict('Пользователь с такой почтой уже зарегистрирован.'));
            } else if (error.name === 'ValidationError') {
              next(new ErrorBadRequest('Переданы неккоректные данные для создания пользователя.'));
            } else {
              next(error);
            }
          });
      })
      .catch(next);
  } else {
    next(new ErrorBadRequest('Не указан пароль.'));
  }
};

const authUser = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      const token = getJwtToken(user._id);
      res
        .cookie('jwt', token, {
          maxage: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ message: 'Успешная авторизация.' });
    })
    .catch(() => {
      next(new ErrorUnauthorized('Неправильные почта или пароль.'));
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход.' });
};

const getUser = (req, res, next) => {
  User.findById(req.user.payload)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user.payload,
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
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
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
