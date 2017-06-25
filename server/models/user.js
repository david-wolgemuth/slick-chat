const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const { ObjectId } = mongoose.Schema.Types;

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
  team: {
    type: ObjectId,
    ref: 'Team'
  },
  channels: [{
    type: ObjectId,
    ref: 'Channel'
  }],
  confirmed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.plugin(mongooseBcrypt);
mongoose.model('User', userSchema);
