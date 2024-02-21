const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string()
        .required()
        .pattern(/^\S+@\S+\.\S+$/),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = router;
