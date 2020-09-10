//OAUTH
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config();
require('./config/database');
require('./config/passport');


const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');

//mounting middleware
app.use(logger('dev'));
app.use(express.json());

// Serve from the build folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
// app.use(cookieParser());


app.use(session({
    secret: 'expenseTRACKER',
    resave: false,
    saveUninitialized: true
}));


// OAUTH
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/home', homeRouter);


// Catch all route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


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

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
});

// module.exports = app;
