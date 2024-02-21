const { JWT_SECRET = 'c9310ab8bf2ac4c3' } = process.env;
const jwt = require('jsonwebtoken');
const AnthorizedError = require('../errors/unathorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // console.log(1.1);
    next(new AnthorizedError('Неправильная почта или пароль'));
  }
  // console.log(1.2);
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AnthorizedError('Неправильная почта или пароль'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  // console.log(req.user._id + " !!!")

  next(); // пропускаем запрос дальше
};
