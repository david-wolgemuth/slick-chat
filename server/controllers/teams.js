const express = require('express');
const teams = express.Router();
module.exports = teams;

teams.post('/', (request, response) => {
  console.log(request.body);
  response.json({ message: 'Successfully Created Team' });
});
