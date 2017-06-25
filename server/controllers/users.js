const express = require('express');
const users = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = users;

users.post('/', (request, response) => {
  User.create()
  response.json({ message: 'Successfully Created User' });
});
