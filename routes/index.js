var express = require('express');
var router = express.Router();
const passport = require('passport');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/home');
});


router.get('/auth/google',
  console.log('**auth/google'),
  passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/fail'
    })
);

router.get('/logout', function (req, res) {
    console.log('**/logout'),
    req.logout();
    res.redirect('/logout');
});

module.exports = router;
