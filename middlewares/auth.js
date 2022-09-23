const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const ErrorUnauthorized = require('../utils/errors/unauthorized');

const messages = require('../utils/messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorUnauthorized(messages.errorsMessages.authRequired);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ErrorUnauthorized(messages.errorsMessages.wrongToken);
  }

  req.user = payload;

  console.log(payload);

  next();
};
