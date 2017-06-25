const express = require('express');
const teamAdmins = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken');

module.exports = teamAdmins;

teamAdmins.post('/', (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  User.create({
    firstName, lastName, email, password
  })
  .then((user) => {
    Team.create({
      admins: [user]
    })
    .then((team) => {
      user.team = team;
      user.save()
      .then(() => {
        response.json({
          message: 'Successfully Created Team Admin',
          data: { userId: user._id, teamId: team._id }
        });
      });
    });
  });
});

teamAdmins.get('/:adminId/request-confirmation', (request, response) => {
  const { adminId } = request.params;
  User.findById(adminId).populate('team').exec()
  .then(admin => {
    mailer.sendTeamAdminConfirmation(admin, admin.team)
    .then(() => {
      response.json({
        message: 'Sent Email Confirmation'
      });
    });
  });
});

teamAdmins.get('/:adminId/confirmation', (request, response) => {
  jwt.verify(request.query.token, process.env.JWT_SECRET, (err, decoded) => {      
    if (err || decoded.user !== request.params.adminId) {
      return response.status(403).json({ message: 'Failed to authenticate token.' });    
    }
    User.findById(decoded.user)
    .then(user => {
      user.confirmed = true;
      user.save()
      .then(() => response.redirect('/'));
    });
  });
});
