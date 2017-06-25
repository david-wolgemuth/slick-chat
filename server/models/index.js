const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('./user');
require('./team');
require('./upload');
require('./message');
require('./channel');

mongoose.connect('mongodb://localhost/slick-app', {/*
  user: 'someuser',
  password: 'somepass',
*/})
.then(() => console.log('Successfully Connected To Database'));
