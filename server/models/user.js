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
  /* NO LONGER REQUIRE CONFIRMATION EMAIL */
  // confirmed: {
  //   type: Boolean,
  //   default: false
  // }
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
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 16; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  text = 'asdf';  /* FOR DEVELOPMENT */
  return text;
};

userSchema.statics.findUsersWithIds = function (ids)
{
  const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
  return this.find({ _id: { $in: objectIds } });
};

userSchema.statics.findTeamsBelongingToUserWithEmail = function (email)
{
  const Team = mongoose.model('Team');
  const User = this;
  return User.find({ email }).select('team')
  .then(users => {
    const teamIds = users.map(user=>user.team);
    return Team.find({ _id: { $in: teamIds }});
  });
};

userSchema.statics.findTeamsBelongingToUserIds = function (userIds)
{

  const Team = mongoose.model('Team');
  const User = this;
  return User.findUsersWithIds(userIds).select('team')
  .then(users => {
    return Team.find({ _id: { $in: users.map(user=>user.team) }});
  });
};

userSchema.plugin(mongooseBcrypt);
mongoose.model('User', userSchema);
