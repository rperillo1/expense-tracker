var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/user');


router.post('/authenticate', usersCtrl.verifyUser);
router.post('/login', usersCtrl.login);
router.get('/login', usersCtrl.getUser);


module.exports = router;
