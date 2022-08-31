const router = require('express').Router();

const auth = require('../middlewares/auth');

const ErrorNotFound = require('../utils/errors/not-found');

const {
  validateUserCreate,
  validateUserAuth,
} = require('../middlewares/celebrate');

const routesUsers = require('./users');
const routesMovies = require('./movies');

const {
  createUser,
  authUser,
  logout,
} = require('../controllers/users');

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateUserAuth, authUser);
router.get('/signout', logout);

router.use(auth);

router.use('/users', routesUsers);
router.use('/movies', routesMovies);

router.use((req, res, next) => {
  next(new ErrorNotFound('Страница не найдена.'));
});

module.exports = router;
