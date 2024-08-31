import React, { useState, useEffect } from 'react';
import { saveTranscodingSettings, getTranscodingSettings } from '../services/transcodingSettings'; // Import the service functions
import { uploadVideo} from '../services/video';

const Upload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({
    format: 'mp4',
    resolution: '720p',
    bitrate: '2000k',
    audioCodec: 'aac',
  });

  // Fetch user's existing transcoding settings when the component loads
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getTranscodingSettings();
        setSettings(settings);
      } catch (error) {
        console.error('Error fetching transcoding settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Function to save the transcoding settings
  const handleSaveSettings = async () => {
    try {
      await saveTranscodingSettings(settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('Error saving transcoding settings. Please try again.');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!videoFile) {
      alert('Please select a video file to upload.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      setIsProcessing(true);
 
      // Make the request with the token included in the headers
      const response = await uploadVideo(formData);
      alert('Video uploaded successfully!');
      setIsProcessing(false);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
      setIsProcessing(false);
      alert('Error uploading video: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload} style={styles.form}>
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input type="file" accept="video/*" onChange={handleFileChange} style={styles.fileInput} />
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <div style={styles.settings}>
          <label>
            Format:
            <select name="format" value={settings.format} onChange={handleSettingChange} style={styles.select}>
              <option value="mp4">MP4</option>
              <option value="mkv">MKV</option>
              <option value="webm">WebM</option>
              <option value="avi">AVI</option>
            </select>
          </label>
          <label>
            Resolution:
            <select name="resolution" value={settings.resolution} onChange={handleSettingChange} style={styles.select}>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4k">4K</option>
            </select>
          </label>
          <label>
            Bitrate:
            <input
              type="text"
              name="bitrate"
              value={settings.bitrate}
              onChange={handleSettingChange}
              style={styles.input}
            />
          </label>
          <label>
            Audio Codec:
            <select name="audioCodec" value={settings.audioCodec} onChange={handleSettingChange} style={styles.select}>
              <option value="aac">AAC</option>
              <option value="mp3">MP3</option>
              <option value="opus">Opus</option>
              <option value="vorbis">Vorbis</option>
            </select>
          </label>
          <button type="button" onClick={handleSaveSettings} style={styles.button}>
            Save Settings
          </button>
        </div>
        <button type="submit" style={styles.button}>
          Upload Video
        </button>
      </form>
      {/* Spinner for Upload and Transcoding */}
      {isProcessing && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Processing your video... Please wait.</p>
          <div style={styles.spinner}></div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  fileInput: {
    padding: '8px',
  },
  settings: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  select: {
    padding: '8px',
    marginTop: '5px',
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3', // Light grey
    borderTop: '4px solid #3498db', // Blue
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};
// Add spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,
  styleSheet.cssRules.length
);
export default Upload;