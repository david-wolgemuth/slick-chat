const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
global.Promise = require("bluebird");

Promise.onPossiblyUnhandledRejection((error) => {
  throw error;
});

require('./server/models');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./client/dist'));
app.use(express.static(path.join( __dirname, './client/src' )));

app.use(session({
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

const router = require('./server/controllers');
app.use('/api', router);

app.get('/', (request, response) => {
  response.sendfile('./client/index.html');
});

app.listen(3000, () => {
  console.log('LISTENING ON 3000');
});
