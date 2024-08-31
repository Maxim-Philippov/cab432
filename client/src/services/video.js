// src/services/video.js
import api from './api';

export const uploadVideo = (formData) => {
    // Retrieve the token from local storage or another secure place
    const token = localStorage.getItem('token'); // Adjust as per your storage strategy
  
    // Make the API request with the token included in the headers
    return api.post('/video/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // Include the Bearer token in the request
      },
    });
  };
export const getUserVideos = () => api.get('/video/my-videos');
// Function to get the video streaming URL
export const getVideoStreamUrl = (filename) => {
    return `/api/videos/stream/${filename}`;
  };
  