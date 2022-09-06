const Movie = require('../models/movie');

const ErrorBadRequest = require('../utils/errors/bad-request');
const ErrorNotFound = require('../utils/errors/not-found');
const ErrorForbidden = require('../utils/errors/forbidden');

const messages = require('../utils/messages');

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
        next(new ErrorBadRequest(messages.errorsMessages.invalidMovieData));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound(messages.errorsMessages.notfoundMovie));
      }
      if (movie.owner.toString() !== req.user.payload.toString()) {
        return next(new ErrorForbidden(messages.errorsMessages.forbiddenMovieDelete));
      }
      return movie.remove()
        .then(() => res.send({ message: messages.messages.movieDeleteOk }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
