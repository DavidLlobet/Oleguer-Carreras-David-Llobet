const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  seriesId: {
    type: [Types.ObjectId],
    ref: 'Serie',
  },
});

const User = model('User', userSchema);

module.exports = User;
