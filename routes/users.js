var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/user');


router.post('/login', usersCtrl.login)


module.exports = router;
