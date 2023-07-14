const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

module.exports = (req, res, next) => {
  // const token = jwt.sign(
  //   { _id: req.cookies.jwt },
  //   NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret',
  // );

  const token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(next);
  }
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return handleAuthError();
  }
  req.user = payload;
  next();
  return null;
};
