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
  channels: [{
    type: ObjectId,
    ref: 'Channel'
  }]
}, {
  timestamps: true
});

teamSchema.statics.findByUrl = function (url)
{
  return this.findOne({ url: url });
};

teamSchema.methods.hasAdmin = function (userIds)
{
  return this.admins.some((admin) => {
    for (let id of userIds) {
      if (admin.equals(id)) {
        return true;
      }
    }
    return false;
  });
};

mongoose.model('Team', teamSchema);
