const express = require('express');
const bodyParser = require('body-parser');
require('./server/models');
const router = require('./server/controllers');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./client/dist'));
app.use('/api', router);

app.get('*', (request, response) => {
  response.sendfile('./client/index.html');
});

app.listen(3000, () => {
  console.log('LISTENING ON 3000');
});
