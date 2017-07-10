const mongoose = require('mongoose');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken');

const users = {};
const User = mongoose.model('User');
const Team = mongoose.model('Team');

module.exports = users;

/**
 * Get a list of all logged in users (with embedded teams)
 * response: {
 *   message, data: { users: { team } }
 * }
 */
users.me = (request, response, next) => {
  User.findUsersWithIds(request.userIds()).populate('team').exec()
  .then(users => {
    response.json({
      message: 'Logged In Users',
      data: { users }
    });
  }).catch(next);
};

/**
 * Get all users on team (must be on team)
 * params: { teamId }
 * response: { message, data: { user } }
 */
users.index = (request, response) => {
  const { teamId } = request.params;
  const user = request.user({ teamId });
  if (!user) {
    return response.status(403).json({ message: 'User Not On Team' });
  }
  User.find({ team: teamId })
  .then(users => {
    response.json({
      message: `Users on team "${teamId}`,
      data: { users }
    });
  });
};

/**
 * When passed a userId or teamId in query will logout only that user,
 * Otherwise logs out all users in session
 * response: { message }
 */
users.logout = (request, response) => {
  const { userId, teamId } = request.query;
  if (userId) {
    request.removeUserFromSession({ userId });
    response.json({ message: `Logged Out User "${userId}"` });
  } else if (teamId) {
    request.removeUserFromSession({ teamId });
    response.json({ message: `Logged Out Team "${teamId}"` });
  } else {
    request.session.users = [];
    response.json({ message: 'Logged Out All Users' });
  }
};

/**
 * Create User (Invite to Team)
 * Should only be done by team admin (users cannot invite themselves to team)
 * Admin must be logged in
 * 
 * Sends invitation email to user, with temporary password
 * 
 * params: { teamId }
 * body: {
 *   firstName, lastName, email  (no password)
 * }
 * response: {
 *   message,
 *   data: { userId }
 * }
 */
users.create = (request, response, next) => {
  const { firstName, lastName, email } = request.body;
  const { teamId } = request.params;
  Team.findById(teamId)
  .then(team => {
    if (!team) {
      return response.status(404).json({ message: 'Team Not Found.' });
    }
    if (!team.hasAdmin(request.user({ teamId })._id)) {
      return response.status(403).json({ message: 'Unauthorized To Invite User To Team' });
    }
    const tempPassword = User.generateRandomPassword();
    User.create({
      firstName, lastName, email, team, password: tempPassword
    })
    .then(user => {
      return Promise.resolve()
      /* TURNED OFF FOR DEVELOPMENT */
      // mailer.sendUserInvitation(user, team, tempPassword)
      .then(() => {
        response.json({
          message: 'Successfully Created User And Sent Invitation Email',
          data: { user }
        });
      });
    });
  }).catch(next);
};

/**
 * Log User In to Specific Team
 * params: { teamId }
 * body: {
 *   email, password
 * }
 * response: {
 *   message,
 *   data: { user }
 * }
 */
users.login = (request, response, next) => {
  const { teamId } = request.params;
  const { email, password } = request.body;
  User.authenticate({ teamId, email, password })
  .then(user => {
    if (!user) {
      return response.status(400).json({ message: 'Failed To Login User' });
    }
    request.addUserToSession(user);
    response.json({
      message: 'Logged In User',
      data: { user }
    });
  }).catch(next);
};

/**
 * User confirmation from link in email invitation
 * Logs in user for team
 * query: { token }
 * params: { userId }
 * redirects
 */
users.confirmation = (request, response, next) => {
  jwt.verify(request.query.token, process.env.JWT_SECRET, (err, decoded) => {      
    if (err || decoded.user !== request.params.userId) {
      return response.status(403).json({ message: 'Failed to authenticate token.' });    
    }
    User.findById(decoded.user)
    .then(user => {
      user.confirmed = true;
      request.addUserToSession(user);
      user.save()
      .then(() => response.redirect('/'));
    }).catch(next);
  });
};

/**
 * Update User
 * Must be logged in
 * params: { teamId, userId }
 * response: {
 *   message,
 *   data: { user }
 * }
 */
users.update = (request, response, next) => {
  const { teamId, userId } = request.params;
  if (!request.user({ userId })) {
    return response.status(403).json({ message: 'Not Authorized To Update User' });
  }
  User.findById(userId)
  .then(user => {
    if (user.team.toString() !== teamId) {
      return response.status(403).json({ message: 'User Not On Team' });
    }
    for (let key in request.body) {
      user[key] = request.body[key];
    }
    user.save()
    .then(() => {
      response.json({
        message: 'Updated User',
        data: { user }
      }); 
    });
  }).catch(next);
};
