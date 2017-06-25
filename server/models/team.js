const mongoose = require('mongoose');
const { ObjectId, String } = mongoose.Schema.Types;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  url: {
    type: String,
    // required: true,
    // unique: true,
    // match: [
    //   /^[a-z][a-z\-\_]+[a-z]$/,
    //   'Must be lowercase. Can have `-` or `_`, but start and end with letter.'
    // ]
  },
  image: {
    type: ObjectId,
    ref: 'Upload'
  },
  admins: [{
    type: ObjectId,
    ref: 'User'
  }],
  channels: [{
    type: ObjectId,
    ref: 'Channel'
  }]
}, {
  timestamps: true
});

mongoose.model('Team', teamSchema);
