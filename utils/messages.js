const messages = {
  authOk: 'Успешная авторизация.',
  movieDeleteOk: 'Фильм удален.',
};

const errorsMessages = {
  // сообщение об ошибке по умолчанию
  defErrorMessage: 'На сервере произошла ошибка',
  // страница не найдена
  pageNotFound: 'Страница не найдена.',
  // ошибки, связанные с почтой
  emailRequired: 'Почта должна быть обязательно указана.',
  invalidEmail: 'Указана некорректная почта.',
  emailConflict: 'Пользователь с такой почтой уже зарегистрирован.',
  // ошибки, связанные с паролем
  passwordRequired: 'Требуется пароль.',
  // ошибки авторизации
  wrongAuth: 'Неправильные почта или пароль пользователя.',
  authRequired: 'Необходима авторизация.',
  wrongToken: 'Неправильный токен. Необходима авторизация.',
  // ошибки пользователя
  invalidUserData: 'Переданы некорректные данные для создания пользователя.',
  userNameRequired: 'Должно быть указано имя пользователя.',
  userNameLength: 'Имя должно содержать от 2-х до 30-и символов',
  // ошибки фильмов
  invalidMovieData: 'Переданы некорректные данные для создания фильма.',
  notfoundMovie: 'Фильм не найден.',
  forbiddenMovieDelete: 'Нельзя удалять чужие фильмы.',
};

module.exports = {
  messages,
  errorsMessages,
};
