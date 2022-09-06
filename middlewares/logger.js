const winston = require('winston');
const expressWinston = require('express-winston');

const { loggerFilenames } = require('../utils/config');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: loggerFilenames.requestLogFilename,
    }),
  ],
  format: winston.format.json(),
});

const errorsLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: loggerFilenames.errorLogFilename,
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorsLogger,
};
