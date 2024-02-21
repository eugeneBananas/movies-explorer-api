const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 секунд
  max: 10, // ограничение на 10 запросов с одного IP
  message:
    'Превышен лимит запросов с вашего IP, пожалуйста, подождите некоторое время',
});

module.exports = {
  limiter,
};
