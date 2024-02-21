const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      description: Joi.string().required(),
      year: Joi.string().required(),
      image: Joi.string().required().uri(),
      trailerLink: Joi.string().required().uri(),
      thumbnail: Joi.string().required().uri(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:_id',
  // celebrate({
  //   params: Joi.object().keys({
  //     movieId: Joi.number().required(),
  //   }),
  // }),
  deleteMovie,
);

module.exports = router;
