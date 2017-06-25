const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const { ObjectId, String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true,
    bcrypt: true
  },
  channels: [{
    type: ObjectId,
    ref: 'Channel'
  }]
}, {
  timestamps: true
});

userSchema.plugin(mongooseBcrypt);
mongoose.model('User', userSchema);
