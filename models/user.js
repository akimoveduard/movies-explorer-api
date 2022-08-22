const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const ErrorUnauthorized = require('../utils/errors/unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Почта должна быть обязательно указана.'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Указана некорректная почта.',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо придумать пароль.'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Имя нужно обязательно указать.'],
    minlength: [2, 'Имя не должно быть короче 2-х символов.'],
    maxlength: [30, 'Имя не должно быть длиннее 30-и символов.'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Неправильные почта или пароль.');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorUnauthorized('Неправильные почта или пароль.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
