const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const rateLimiter = require('./utils/rate-limit');

const {
  requestLogger,
  errorsLogger,
} = require('./middlewares/logger');

const handleErrors = require('./middlewares/handle-errors');

const corsConfig = require('./utils/cors-config');

const { PORT, MONGODB_CONNECT } = require('./utils/config');

const router = require('./routes/index');

const app = express();
mongoose.connect(MONGODB_CONNECT);

app.use(requestLogger);

app.use(helmet());
app.use(rateLimiter);
app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

app.use(errorsLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
