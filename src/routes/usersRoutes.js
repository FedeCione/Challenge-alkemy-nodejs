let express = require('express');
let router = express.Router();
let { formLogin, login, formRegister, register } = require('../controllers/usersController');
let loginValidator = require('../validations/loginValidator');
let registerValidator = require('../validations/registerValidator');

// Login
router.get('/login', formLogin);
router.post('/login', loginValidator, login);

// Register
router.get('/register', formRegister);
router.post('/register', registerValidator, register);

module.exports = router;
