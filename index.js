const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { errors } = require('celebrate');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const auth = require('./middlewares/auth');

// Кастомная обработка ошибок
const handleErrors = require('./middlewares/handle-errors');
const ErrorNotFound = require('./utils/errors/not-found');

const corsConfig = require('./utils/cors-config');

const {
  requestLogger,
  errorsLogger,
} = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const {
  PORT = 3000,
  MONGODB_CONNECT = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const routesUsers = require('./routes/users');

const {
  createUser,
  authUser,
  logout
} = require('./controllers/users');

const app = express();
mongoose.connect(MONGODB_CONNECT);

app.use(requestLogger);

app.use(helmet());
/*app.use(limiter);*/
app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', authUser);
app.get('/signout', logout);

app.use(auth);

app.use('/users', routesUsers);

app.use(errorsLogger);

app.use(errors());

/*app.use((req, res, next) => {
  next(new ErrorNotFound('Страница не найдена.'));
});*/

app.use(handleErrors);

app.listen(PORT);
