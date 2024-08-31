import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import '../styling/auth.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful.');
      navigate('/upload'); // Redirect to upload page after login
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Login failed'}`);
    }
  };

  return (
    <div className="auth-container">   
    <form className="auth-form" onSubmit={handleLogin}>
      <h2 className="auth-title">Login</h2>
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
        <button type="submit" className="auth-button">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;