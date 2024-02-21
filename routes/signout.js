const router = require('express').Router();
const { signOut } = require('../controllers/users');

router.delete('/', signOut);

module.exports = router;
