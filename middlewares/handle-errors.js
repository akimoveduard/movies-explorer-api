const messages = require('../utils/messages');

module.exports = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? `${messages.errorsMessages.defErrorMessage} ${message}`
      : message,
  });
  next();
};
