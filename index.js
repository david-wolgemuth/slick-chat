const express = require('express');
const app = express();

app.use(express.static('./client/dist'));

app.get('*', (request, response) => {
  response.sendfile('./client/index.html');
});

app.listen(3000, () => {
  console.log('LISTENING ON 3000');
});
