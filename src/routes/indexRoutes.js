var express = require('express');
var router = express.Router();
let { index } = require('../controllers/indexController');
let verifyToken = require('../middlewares/verifyToken');

// Index
router.get('/', verifyToken, index);

module.exports = router;
