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

userSchema.statics.authenticate = function ({ teamId, email, password})
{
  return this.findOne({ email: email, team: teamId })
  .then(user => {
    if (!user) {
      return null;
    }
    return user.verifyPassword(password)
      .then(valid => {
        if (valid) {
          return user;
        }
        return null;
      });
  });
};

userSchema.statics.authenticateLogin = function ({ email, password})
{
  return this.findOne({ email: email })
  .then(user => {
    if (!user) {
      return null;
    }

    return user.verifyPassword(password)
      .then(valid => {
        if (valid) {
          return user;
        }
        return null;
      });
  });
};

userSchema.statics.generateRandomPassword = function ()
{
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(let i = 0; i < 16; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

userSchema.plugin(mongooseBcrypt);
mongoose.model('User', userSchema);
