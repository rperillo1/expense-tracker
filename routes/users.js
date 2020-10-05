var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/user');


router.post('/authenticate', usersCtrl.verifyUser);


module.exports = router;
