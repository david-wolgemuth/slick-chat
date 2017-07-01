const mongoose = require('mongoose');

const User = mongoose.model('User');
const Message = mongoose.model('Message');
const Channel = mongoose.model('Channel');
const messages = {};
module.exports = messages;

/**
 * Create a Message
 * params: { teamId, channelId }
 * body: {
 *  content
 * }
 * response: {
 *   message: String,
 *   data: { message }
 * }
 */
messages.create = (request, response, next) => {
  const { content } = request.body;
  const { teamId, channelId } = request.params;
  const userId = request.user({ teamId })._id;
  User.findById(userId)
  .then(user => {
    Channel.findById(channelId)
    .then(channel => {
      Message.create({
        channel, user, content
      })
      .then(message => {
        channel.messages.push(message);
        channel.save()
        .then(() => {
          response.json({
            message: 'Successfully Created Message',
            data: { message }
          });
        });
      });
    });
  }).catch(next);
};

messages.index = (request, response, next) => {
  const { teamId, channelId } = request.params;
  const userId = request.user({ teamId })._id;
  Message.find({ channel: channelId }).populate('user', 'email').exec()
  .then(messages => {
    response.json({
      message: `All messages on channel "${channelId}`,
      data: { messages }
    });
  }).catch(next);
};
