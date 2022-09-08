const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const ErrorUnauthorized = require('../utils/errors/unauthorized');

const messages = require('../utils/messages');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ErrorUnauthorized(messages.errorsMessages.authRequired);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ErrorUnauthorized(messages.errorsMessages.wrongToken);
  }

  req.user = payload;

  next();
};
