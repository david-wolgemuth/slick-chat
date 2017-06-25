const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    // required: true,
  },
  upload: {
    type: ObjectId,
    ref: 'Upload'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  channel: {
    type: ObjectId,
    ref: 'Channel'
  }
}, {
  timestamps: true
});

mongoose.model('Message', messageSchema);
