require('dotenv').config();

const HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
};
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(limiter);

app.use(requestLogger);

// не требуют авторизации
app.use('/signin', require('./routes/signin'));
app.use('/signup', require('./routes/signup'));

app.use(auth);

// требуют авторизации
app.use('/signout', require('./routes/signout'));
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode).send({
    message:
      statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
  console.error(error); // Вывод ошибки в консоль
  next(error); // Передача ошибки дальше для обработки
});

app.listen(PORT, () => {});
