const { celebrate, Joi } = require('celebrate');

const {
  userErrorsMessages,
  movieErrorsMessages,
} = require('../utils/errors/celebrate-errors-messages');

// USER

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': userErrorsMessages.email.required,
      'string.email': userErrorsMessages.email.invalid,
    }),
    password: Joi.string().required().messages({
      'any.required': userErrorsMessages.password.required,
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': userErrorsMessages.name.required,
        'string.min': userErrorsMessages.name.min,
        'string.max': userErrorsMessages.name.max,
      }),
  }),
});

const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': userErrorsMessages.email.required,
      'string.email': userErrorsMessages.email.invalid,
    }),
    password: Joi.string().required().messages({
      'any.required': userErrorsMessages.password.required,
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': userErrorsMessages.email.invalid,
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': userErrorsMessages.name.min,
        'string.max': userErrorsMessages.name.max,
      }),
  }),
});

// MOVIE

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().alphanum().required()
      .messages({
        'any.required': movieErrorsMessages.country.required,
      }),
    director: Joi.string().alphanum().required()
      .messages({
        'any.required': movieErrorsMessages.director.required,
      }),
    duration: Joi.number().integer().required()
      .messages({
        'any.required': movieErrorsMessages.duration.required,
        'number.base': 'Должно быть числом',
      }),
    year: Joi.string().required().length(4).pattern(/^[0-9]+$/)
      .messages({
        'any.required': movieErrorsMessages.year.required,
        'string.length': movieErrorsMessages.year.length,
        'string.pattern.base': movieErrorsMessages.year.pattern,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': movieErrorsMessages.description.required,
      }),
    image: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/)
      .messages({
        'any.required': movieErrorsMessages.image.required,
        'string.empty': movieErrorsMessages.image.empty,
        'string.pattern.base': movieErrorsMessages.image.pattern,
      }),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/)
      .messages({
        'any.required': movieErrorsMessages.trailer.required,
        'string.empty': movieErrorsMessages.trailer.empty,
        'string.pattern.base': movieErrorsMessages.trailer.pattern,
      }),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/)
      .messages({
        'any.required': movieErrorsMessages.thumbnail.required,
        'string.empty': movieErrorsMessages.thumbnail.empty,
        'string.pattern.base': movieErrorsMessages.thumbnail.pattern,
      }),
    movieId: Joi.string().required()
      .messages({
        'any.required': movieErrorsMessages.movieId.required,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': movieErrorsMessages.nameRU.required,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': movieErrorsMessages.nameEN.required,
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  })
    .messages({
      'string.length': 'id фильма должен состоять из 24 символов.',
    }),
});

module.exports = {
  validateUserCreate,
  validateUserAuth,
  validateUpdateUser,
  validateMoviePost,
  validateMovieId,
};
