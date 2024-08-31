const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  filePath: { type: String, required: true },
  transcodedPath: { type: String }, // Path to the transcoded video
  status: { type: String, enum: ['uploaded', 'transcoding', 'completed', 'failed'], default: 'uploaded' },
  createdAt: { type: Date, default: Date.now },
  transcodedAt: { type: Date },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, // Ensures that each video is associated with a user
  },
});
videoSchema.index({ title: 1, user: 1 }, { unique: true });
module.exports = mongoose.model('Video', videoSchema);