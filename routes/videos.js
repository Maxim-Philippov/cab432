const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const Video = require('../models/Video');
const TranscodingSetting = require('../models/transcodingSettings');
const authMiddleware = require('../middleware/authMiddleware');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const router = express.Router();

const uploadDirectory = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1024 * 1024 }, // Optional: limit file size to 100MB
  fileFilter: (req, file, cb) => {
    // Validate file type if needed
    const filetypes = /mp4|mkv|avi|webm/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only video files are allowed!'));
  },
});
router.get('/my-videos', authMiddleware, async (req, res) => {
  try {
    // Find videos uploaded by the user
    const videos = await Video.find({ user: req.userId }).sort({ createdAt: -1 }); // Sorted by latest uploads first
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});
// Helper function to convert resolution shorthand to width x height
const getResolution = (resolution) => {
  switch (resolution) {
    case '480p':
      return '640x480';
    case '720p':
      return '1280x720';
    case '1080p':
      return '1920x1080';
    case '4k':
      return '3840x2160';
    default:
      throw new Error('Invalid resolution specified');
  }
};
// Upload video and automatically transcode
router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  const { title } = req.body;

  try {
    if (!req.file) {
      console.error('Upload Error: No file uploaded.');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log the uploaded file details
    console.log('Uploaded file:', req.file);

    // Save the uploaded video information
    const newVideo = new Video({
      title,
      filePath: req.file.filename,
      status: 'uploaded',
      user: req.userId,
    });

    await newVideo.save();

    // Fetch user's saved transcoding settings
    const settings = await TranscodingSetting.findOne({ user: req.userId });

    if (!settings) {
      console.error('Transcoding Error: Transcoding settings not found.');
      return res.status(400).json({ message: 'Transcoding settings not found. Please set your settings first.' });
    }
    const resolution = getResolution(settings.resolution);
    // Define paths for input and output files
    const inputPath = path.join(uploadDirectory, newVideo.filePath);
    console.log(inputPath)
    const outputFilename = `transcoded-${Date.now()}-${newVideo.filePath.split('.')[0]}.${settings.format}`;
    const outputPath = path.join(uploadDirectory, outputFilename);

    // Check if the input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Transcoding Error: Input file not found at ${inputPath}`);
      newVideo.status = 'failed';
      await newVideo.save();
      return res.status(404).json({ message: 'Input file not found' });
    }

    // Automatic transcoding using FFmpeg
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libx264')
      .audioCodec(settings.audioCodec)
      .size(resolution)
      .videoBitrate(settings.bitrate)
      .format(settings.format)
      .on('start', (commandLine) => { console.log('FFmpeg command:', commandLine); })
      .on('end', async () => {
        console.log(`Transcoding completed: ${outputFilename}`);
        newVideo.transcodedPath = outputFilename;
        newVideo.status = 'completed';
        await newVideo.save();
        res.status(200).json({ message: 'Upload and transcoding completed successfully.', video: newVideo });
      })
      .on('error', async (err) => {
        console.error('Error during transcoding:', err.message);
        newVideo.status = 'failed';
        await newVideo.save();
        res.status(500).json({ message: 'Error during transcoding', error: err.message });
      })
      .run();
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video', error: error.message });
  }
});

module.exports = router;