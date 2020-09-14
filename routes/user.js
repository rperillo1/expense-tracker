var express = require('express');
var router = express.Router();
const passport = require('passport');



// router.get('/', function (req, res, next) {
//     res.redirect('/home');
// });


// router.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['profile', 'email']
//     }),
// );

// router.get('/oauth2callback',
//     function (req, res) {
//         console.log('/oauth2callback')
//     },
//     passport.authenticate('google', {
//         successRedirect: '/home',
//         failureRedirect: '/fail'
//     }),
// );

// router.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;
