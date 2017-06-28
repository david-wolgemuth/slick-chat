const mongoose = require('mongoose');

module.exports.handleServerError = (error, request, response, next) => {
  console.log('HANDLING ERROR', error);
  if (response.headersSent) {
    return next(error);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
    data: { error: error.stack }
  });
};

module.exports.setSessionUsers = (request, response, next) => {
  if (!request.session.users) {
    request.session.users = [];
  }
  request.user = searchUser;
  request.addUserToSession = addUserToSession;
  request.removeUserFromSession = removeUserFromSession;
  request.userIds = userIds;
  next();
};

const userIds = function ()
{
  return this.session.users.map(user => user._id);
};

const searchUser = function ({ userId, teamId })
{
  if (userId) {
    return this.session.users.find(user => user._id === userId.toString()) || null;
  }
  if (teamId) {
    return this.session.users.find(user => user.team === teamId.toString()) || null;
  }
};

const addUserToSession = function (user)
{
  const userObj = { _id: user._id.toString() };
  if (user.team instanceof mongoose.Types.ObjectId) {
    userObj.team = user.team.toString();
  } else {
    userObj.team = user.team._id.toString();
  }
  this.session.users.push(userObj);
};

const removeUserFromSession = function ({ userId, teamId })
{
   if (userId) {
    this.session.users = this.session.users.filter(user => user._id !== userId.toString());
  }
  if (teamId) {
    this.session.users = this.session.users.filter(user => user.team !== teamId.toString());
  } 
};
