const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const getJwtToken = (id) => {
  const token = jwt.sign({ payload: id }, NODE_ENV !== 'production' ? 'test-secret-word' : JWT_SECRET, { expiresIn: '7d' });
  return token;
};

module.exports = getJwtToken;
