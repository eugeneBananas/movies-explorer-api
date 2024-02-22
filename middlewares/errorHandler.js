const HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = (error, req, res, next) => {
  const { statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode).send({
    message:
      statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
  console.error(error); // Вывод ошибки в консоль
  next(error); // Передача ошибки дальше для обработки
};
