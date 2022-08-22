const jwt = require('jsonwebtoken');

const ErrorUnauthorized = require('../utils/errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ErrorUnauthorized('Необходима авторизация.');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'test-secret-word' : JWT_SECRET);
  } catch (err) {
    throw new ErrorUnauthorized('Неправильный токен. Необходима авторизация.');
  }

  req.user = payload;

  next();
};
