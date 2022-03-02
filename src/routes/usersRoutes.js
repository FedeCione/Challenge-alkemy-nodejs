let express = require('express');
let router = express.Router();
let { formLogin, login, logout, formRegister, register } = require('../controllers/usersController');
let loginValidator = require('../validations/loginValidator');
let registerValidator = require('../validations/registerValidator');
let cookieCheck = require('../middlewares/cookieCheck');

// Login
router.get('/login', cookieCheck, formLogin);
router.post('/login', cookieCheck, loginValidator, login);
router.get('/logout', logout);

// Register
router.get('/register', cookieCheck, formRegister);
router.post('/register', cookieCheck, registerValidator, register);

module.exports = router;
