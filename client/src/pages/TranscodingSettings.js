// src/pages/TranscodingSettings.js
import React, { useState, useEffect } from 'react';
import { saveTranscodingSettings, getTranscodingSettings } from '../services/transcodingSettings'; // Import the service functions

const TranscodingSettings = () => {
  const [settings, setSettings] = useState({
    format: 'mp4',
    resolution: '720p',
    bitrate: '2000k',
    audioCodec: 'aac',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user's existing transcoding settings when the component loads
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const currentSettings = await getTranscodingSettings();
        setSettings(currentSettings);
      } catch (error) {
        console.error('Error fetching transcoding settings:', error);
        setErrorMessage('Failed to fetch transcoding settings.');
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Function to save or update transcoding settings
  const handleSaveSettings = async () => {
    try {
      await saveTranscodingSettings(settings);
      setSuccessMessage('Settings saved successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('Error saving transcoding settings. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Transcoding Settings</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}
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
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
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
  success: {
    color: 'green',
    fontSize: '14px',
  },
};

export default TranscodingSettings;