
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to VideoTranscoder</h1>
        <p>Upload, transcode, and manage your videos with ease.</p>
      </header>
      <main style={styles.main}>
        <button style={styles.button} onClick={() => handleNavigate('/register')}>
          Get Started
        </button>
        <button style={styles.button} onClick={() => handleNavigate('/upload')}>
          Upload Video
        </button>
        <button style={styles.button} onClick={() => handleNavigate('/my-videos')}>
          My Videos
        </button>
      </main>
      <footer style={styles.footer}>
        <p>© 2024 n11067195. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
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
  footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
};

export default LandingPage;
