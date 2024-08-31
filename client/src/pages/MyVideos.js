// src/pages/MyVideos.js
import React, { useEffect, useState } from 'react';
import { getUserVideos } from '../services/video';

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getUserVideos();
        setVideos(response.data);
      } catch (error) {
        setMessage('Error fetching videos. Please try again later.');
      }
    };
    
    fetchVideos();
  }, []);

  return (
    <div style={styles.container}>
      <h2>My Uploaded Videos</h2>
      {message && <p>{message}</p>}
      {videos.length > 0 ? (
        <ul style={styles.videoList}>
          {videos.map((video) => (
            <li key={video._id} style={styles.videoItem}>
              <h3>{video.title}</h3>
              <video width="320" height="240" controls>
                <source src={`http://localhost:3000/uploads/${video.filePath.split('\\').pop().split('/').pop()}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video width="320" height="240" controls>
                <source src={`http://localhost:3000/uploads/${video.transcodedPath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p><strong>Status:</strong> {video.status}</p>
              <p><strong>Uploaded On:</strong> {new Date(video.createdAt).toLocaleDateString()}</p>
              <p><strong>File Name:</strong> {video.filePath.split('\\').pop().split('/').pop()}</p> {/* Display the file name */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos uploaded yet.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  videoList: {
    listStyleType: 'none',
    padding: 0,
  },
  videoItem: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

export default MyVideos;
