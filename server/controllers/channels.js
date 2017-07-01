const mongoose = require('mongoose');

const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Channel = mongoose.model('Channel');
const channels = {};
module.exports = channels;

/**
 * Create a Public or Private Channel
 *  (Logged in user will join the channel and become admin)
 * params: { teamId }
 * body: {
 *  name: String, type: 'PRIVATE|PUBLIC' (not for direct messages)
 * }
 * response: {
 *   message: String,
 *   data: { channel }
 * }
 */
channels.create = (request, response, next) => {
  const { name, type } = request.body;
  const { teamId } = request.params;
  const userId = request.user({ teamId })._id;
  User.findById(userId).populate('team').exec()
  .then(admin => {
    if (!admin) { return response.status(403).json({ message: 'User Not Logged In' }); }
    Channel.create({ name, admin, team: admin.team, type })
    .then(channel => {
      admin.channels.push(channel);
      admin.save()
      .then(() => {
        response.json({
          message: 'Successfully Created Channel',
          data: { channel }
        });
      });
    });
  }).catch(next);
};

/**
 * Search For Channels
 * params: { teamId }
 * query:   { query: 'public|joined|unjoined|private|direct' }  (default: public)
 * response: {
 *   message, data: { channels }
 * }
 */
channels.index = (request, response, next) => {
  const { teamId } = request.params;
  const { userId } = request.user({ teamId });
  const { query } = request.query;
  switch (query) {
  case 'joined':
    return getJoinedChannels(userId, response).catch(next);
  default:
    return getPublicChannels(teamId, response).catch(next);
  }
};

/**
 * Get Channel By Id
 * params: { teamId, channelId }
 * response: {
 *   message, data: { channel }
 * }
 */
channels.show = (request, response, next) => {
  const { teamId, channelId } = request.params;
  const { userId } = request.user({ teamId });
  Channel.findById(channelId)
  .populate('users', 'email').populate('team').exec()
  .then(channel => {
    // TODO: check that user is on channel's team ...
    response.json({
      message: `Channel With Id "${channelId}"`,
      data: { channel }
    });
  });
};

const getJoinedChannels = (userId, response) => {
  return User.findById(userId).populate('channels').exec()
  .then(user => {
    const channels = user.channels;
    return response.json({
      message: `All joined channels for user "${userId}"`,
      data: { channels }
    });
  });
};

const getPublicChannels = (teamId, response) => {
  return Channel.find({ team: teamId, type: 'PUBLIC' })
  .then(channels => {
    return response.json({
      message: `All public channels for team "${teamId}"`,
      data: { channels }
    });
  });
};
