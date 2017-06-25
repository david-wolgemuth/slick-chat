const mongoose = require('mongoose');
// const { } = mongoose.Schema.Types;

const uploadSchema = new mongoose.Schema({

}, {
  timestamps: true
});

mongoose.model('Upload', uploadSchema);
