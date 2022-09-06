const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const ErrorUnauthorized = require('../utils/errors/unauthorized');

const messages = require('../utils/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, messages.errorsMessages.emailRequired],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: messages.errorsMessages.invalidEmail,
    },
  },
  password: {
    type: String,
    required: [true, messages.errorsMessages.passwordRequired],
    select: false,
  },
  name: {
    type: String,
    required: [true, messages.errorsMessages.userNameRequired],
    minlength: [2, messages.errorsMessages.userNameLength],
    maxlength: [30, messages.errorsMessages.userNameLength],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized(messages.errorsMessages.wrongAuth);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorUnauthorized(messages.errorsMessages.wrongAuth);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
