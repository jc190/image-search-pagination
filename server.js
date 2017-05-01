// Required components
const http = require('http');
const path = require('path');
const express = require('express');
const compress = require('compression');
// const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
// const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Required api routes
const users = require('./api/s');

// Required config files
// This file will not be tracked by git as it will contain secret api keys
// const config = require('./config/api');

// Pass passport to passport config file
require('./config/passport')(passport)

// Set mongoose promise library
mongoose.Promise = global.Promise;

// Connect to MongoDB through mongoose
// mongoose.connect('mongodb://' + config.mdbuser + ':' + config.mdbpw + '@localhost:27017/[db name]')
// mongoose.connect('mongodb://localhost:27017/test');
// console.log(mongoose.connection)

// Create express app
const app  = express();

// Add express middleware
app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(expressValidator());
app.use(compress());
// app.use(require('express-session')({
//   // For more secure session secret, place it in config api file and pass it here. ( secret: config.sessionSecret )
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect api routes to app
app.use('/api/users', users);

// If serving a html site use the following, else comment it out
// app.use(express.static(path.resolve('../dist')));

const server = http.createServer(app);

server.listen(3001, process.env.IP || 'localhost', () => {
  const addr = server.address();
  console.log('Server is listening at: http://' + addr.address + ':' + addr.port);
})
