const jwt = require('jsonwebtoken');
const JWT_SECRET = 'c5ffba79651531979e40286eb608246d69b0d7e8ffa24bc5d05fc3c103c120ac954e8fbc66b79456e590d891ea454521f2170fa393705f8dad04c07010179bf1'; // Use the same secret key as in the auth routes

// Middleware to verify JWT and attach userId to the request
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;