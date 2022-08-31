const Movie = require('../models/movie');

const ErrorBadRequest = require('../utils/errors/bad-request');
const ErrorNotFound = require('../utils/errors/not-found');
const ErrorForbidden = require('../utils/errors/forbidden');

const getMovies = (req, res, next) => {
  const owner = req.user.payload;

  Movie.find({ owner })
    .then((movies) => {
      res.status(201).send(movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  const owner = req.user.payload;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные для создания фильма.'));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound('Фильм не найден.'));
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user.payload)) {
        return next(new ErrorForbidden('Нельзя удалять чужие фильмы.'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален.' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
