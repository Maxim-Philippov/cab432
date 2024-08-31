// models/TranscodingSetting.js
const mongoose = require('mongoose');

const transcodingSettingSchema = new mongoose.Schema({
  format: {
    type: String,
    default: 'mp4',
    enum: ['mp4', 'mkv', 'webm', 'avi'],
  },
  resolution: {
    type: String,
    default: '720p',
    enum: ['480p', '720p', '1080p', '4k'],
  },
  bitrate: {
    type: String,
    default: '2000k',
  },
  audioCodec: {
    type: String,
    default: 'aac',
    enum: ['aac', 'mp3', 'opus', 'vorbis'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // This links the settings to the specific user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TranscodingSetting', transcodingSettingSchema);