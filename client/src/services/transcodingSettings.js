import api from './api';
// Fetch transcoding settings for the authenticated user
export const getTranscodingSettings = async () => {
  try {
    const response = await api.get('/transcoding-settings/my-settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching transcoding settings:', error);
    throw error;
  }
};

// Save or update transcoding settings for the authenticated user
export const saveTranscodingSettings = async (settings) => {
  try {
    const response = await api.post('/transcoding-settings/my-settings', settings);
    return response.data;
  } catch (error) {
    console.error('Error saving transcoding settings:', error);
    throw error;
  }
};