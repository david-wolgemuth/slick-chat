const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

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
  description: {
    type: String
  },
  image: {
    type: ObjectId,
    ref: 'Upload'
  },
  admins: [{
    type: ObjectId,
    ref: 'User'
  }],
  /* WE CAN GET THIS INFO FROM CHANNEL */
  // channels: [{  
  //   type: ObjectId,
  //   ref: 'Channel'
  // }]
}, {
  timestamps: true
});

teamSchema.statics.createWithDefaults = function (admin)
{
  const Channel = mongoose.model('Channel');
  return this.create({
      admins: [admin]
  })
  .then(team => {
    return Channel.create({
      team, admin, name: 'general', type: 'PUBLIC'
    })
    .then(channel => {
      admin.channels.push(channel);
      admin.team = team;
      return admin.save()
      .then(() => team);  // Ensure that the team is the last returned object
    });
  });
};

teamSchema.statics.findByUrl = function (url)
{
  return this.findOne({ url: url });
};

teamSchema.methods.hasAdmin = function (userId)
{
  return this.admins.some((admin) => {
    return (admin.equals(userId));
  });
};

teamSchema.methods.withLoggedInKey = function (user)
{
  const team = this.toObject();
  team.loggedInUserId = (user) ? user._id : null;
  return team;
};

teamSchema.statics.publicChannels = function (teamId)
{
  return this.findById(teamId).populate('channels').exec();
};

mongoose.model('Team', teamSchema);
