// Required components
const http = require('http');
const path = require('path');
const express = require('express');
const compress = require('compression');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Required api routes
const imageSearch = require('./api/imageSearch');

// Required config files
// This file will not be tracked by git as it will contain secret api keys
// const config = require('./config/api');

// Set mongoose promise library
mongoose.Promise = global.Promise;

// ------------------------------------------
// TODO: Setup database & database connection
// ------------------------------------------

// Connect to MongoDB through mongoose
// mongoose.connect('mongodb://' + config.mdbuser + ':' + config.mdbpw + '@localhost:27017/[db name]')
mongoose.connect('mongodb://localhost:27017/imageSearch');
// console.log(mongoose.connection)

// Create express app
const app  = express();

// Add express middleware
app.use(morgan('dev'));
app.use(compress());

// Connect api routes to app
app.use('/api/imageSearch', imageSearch);

// If serving a html site use the following, else comment it out
// app.use(express.static(path.resolve('../dist')));

const server = http.createServer(app);

server.listen(3001, process.env.IP || 'localhost', () => {
  const addr = server.address();
  console.log('Server is listening at: http://' + addr.address + ':' + addr.port);
})
