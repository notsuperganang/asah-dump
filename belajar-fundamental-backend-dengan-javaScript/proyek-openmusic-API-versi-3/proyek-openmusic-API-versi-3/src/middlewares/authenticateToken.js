const Jwt = require('jsonwebtoken');
const AuthenticationError = require('../exceptions/AuthenticationError');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    throw new AuthenticationError('Missing authentication token');
  }

  try {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.auth = decoded; // Attach userId and other payload to request
    next();
  } catch (error) {
    throw new AuthenticationError('Invalid authentication token');
  }
};

module.exports = authenticateToken;
