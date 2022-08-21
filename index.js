const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { errors } = require('celebrate');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const corsConfig = require('./utils/cors-config');

const {
  requestLogger,
  errorsLogger
} = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const {
  PORT = 3000,
  MONGODB_CONNECT = 'mongodb://localhost:27017/bitfilmsdb'
} = process.env;

const app = express();
mongoose.connect(MONGODB_CONNECT);

app.use(requestLogger);

app.use(helmet());
app.use(limiter);
app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(errorsLogger);

app.use(errors());

app.listen(PORT);
