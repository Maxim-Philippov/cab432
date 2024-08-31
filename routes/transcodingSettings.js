const express = require('express');
const TranscodingSetting = require('../models/transcodingSettings');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to ensure the user is authenticated

const router = express.Router();

// Fetch transcoding settings for the authenticated user
router.get('/my-settings', authMiddleware, async (req, res) => {
  try {
    const settings = await TranscodingSetting.findOne({ user: req.userId });

    // If no settings found, return default settings
    if (!settings) {
      return res.status(200).json({
        format: 'mp4',
        resolution: '720p',
        bitrate: '2000k',
        audioCodec: 'aac',
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
});

// Save or update transcoding settings for the authenticated user
router.post('/my-settings', authMiddleware, async (req, res) => {
  const { format, resolution, bitrate, audioCodec } = req.body;

  try {
    // Find existing settings for the user
    let settings = await TranscodingSetting.findOne({ user: req.userId });

    if (settings) {
      // Update existing settings
      settings.format = format || settings.format;
      settings.resolution = resolution || settings.resolution;
      settings.bitrate = bitrate || settings.bitrate;
      settings.audioCodec = audioCodec || settings.audioCodec;
    } else {
      // Create new settings if none exist
      settings = new TranscodingSetting({
        format,
        resolution,
        bitrate,
        audioCodec,
        user: req.userId,
      });
    }

    await settings.save();
    res.status(200).json({ message: 'Settings saved successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Error saving settings', error: error.message });
  }
});
router.get('/test', (req, res) => {
  res.send('Server is working');
});
module.exports = router;