const routesMovies = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateMoviePost,
  validateMovieId,
} = require('../middlewares/celebrate');

routesMovies.get('/', getMovies);
routesMovies.post('/', validateMoviePost, postMovie);
routesMovies.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = routesMovies;
