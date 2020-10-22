const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// GraphQL
const { graphqlHTTP } = require('express-graphql');
const connectMongo = require('./mongo-connector');
const schema = require('./schema/schema');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const start = async () => {

    const mongo = await connectMongo();
    const app = express();

    // const userRouter = require('./routes/users');

    app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    // app.use('/api/users', userRouter);
    app.use('/graphql', bodyParser.json(), graphqlHTTP({
        context: { mongo },
        schema,
        graphiql: true
    }));

    app.use(function (req, res, next) {
        next(createError(404));
    });

    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.json('error');
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`GraphQL server running on port ${PORT}.`)
    });
};

start();

// const app = express();


// // const userRouter = require('./routes/users');


// //mounting middleware
// app.use(logger('dev'));
// app.use(express.json());


// // Serve from the build folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Routes 
// // app.use('/api/users', userRouter);
// // app.use(require('./config/auth'));
// app.use('/graphql', bodyParser.json(), graphqlHTTP({
//     context: { mongo },
//     schema,
//     graphiql: true
// }));


// // Catch all route
// // app.get('/*', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// // })


// app.use(function (req, res, next) {
//     next(createError(404));
// });

// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.json('error');
// });

// const port = process.env.PORT || 3001;

// app.listen(port, () => {
//     console.log(`Express app running on port ${port}`)
// });

