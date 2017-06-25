const mongoose = require('mongoose');
const { ObjectId, String } = mongoose.Schema.Types;

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // match: [
    //   /^[a-z][a-z\-\_]+[a-z]$/,
    //   'Must be lowercase. Can have `-` or `_`, but start and end with letter.'
    // ],
    // /*Unique within team Check*/
  },
  team: {
    type: ObjectId,
    ref: 'Team'
  },
  admin: {
    type: ObjectId,
    ref: 'User'
  },
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: mongoose
  }]
}, {
  timestamps: true
});

mongoose.model('Channel', channelSchema);
