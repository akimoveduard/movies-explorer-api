require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_CONNECT = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'test_secret_word',
  NODE_ENV = 'dev',
  SALT_ROUNDS = 10,
} = process.env;

const loggerFilenames = {
  requestLogFilename: 'request.log',
  errorLogFilename: 'error.log',
};

module.exports = {
  PORT,
  MONGODB_CONNECT,
  JWT_SECRET,
  NODE_ENV,
  SALT_ROUNDS,
  loggerFilenames,
};
