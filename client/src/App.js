import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Upload from './pages/Upload';
import MyVideos from './pages/MyVideos';
import LandingPage from './pages/LandingPage';
import TranscodingSettings from './pages/TranscodingSettings'; // Import the Transcoding Settings page
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/transcoding-settings" element={<TranscodingSettings />} /> {/* Transcoding Settings Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
