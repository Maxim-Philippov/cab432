import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import '../styling/auth.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ username, email, password });
      if (response.status === 201) {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful.');
      navigate('/upload'); // Redirect to upload page after login
    }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Registration failed'}`);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2 className="auth-title">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">
          Register
        </button>
        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;