//OAUTH
const session = require('express-session');
const passport = require('passport');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const indexRouter = require('./routes/index');

var app = express();

require('./config/database');
require('./config/passport');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.use(session({
    secret: 'expenseTRACKER',
    resave: false,
    saveUninitialized: true
}));


//OAUTH
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter)


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
