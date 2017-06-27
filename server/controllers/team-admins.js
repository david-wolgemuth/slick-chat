const mongoose = require('mongoose');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const Team = mongoose.model('Team');
const teamAdmins = {};
module.exports = teamAdmins;

/**
 * Create a TeamAdmin
 *  (Also creates a team)
 *  Should requestConfirmation if user successfully created
 *  
 * body: {
 *  email: String
 * }
 * response: {
 *   message: String,
 *   data: { userId, teamId }
 * }
 */
teamAdmins.create = (request, response) => {
  const { email } = request.body;
  User.create({
    email
  })

  .then((user) => {

    // DW Change
    request.session.users.push(user._id);
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
};

/**
 * Sends confirmation email to email associated with Admin Id
 * params: { adminId }
 */
teamAdmins.requestConfirmation = (request, response) => {
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
};

/**
 * Update Admin to Be Confirmed
 * params: { adminId }
 * redirects
 */
teamAdmins.confirmation =  (request, response) => {
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
};
