const { Schema, model, Types } = require('mongoose');

const serieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isWatched: {
    type: Boolean,
    required: true,
  },
  platformId: {
    type: Types.ObjectId,
    ref: 'Platform',
    required: true,
  },
  fileUrl: {
    type: String,
  },
});

const Serie = model('Serie', serieSchema);

module.exports = Serie;
