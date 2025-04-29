// utils/jwtUtil.js
const jwt = require('jsonwebtoken');

// generateToken will create a JWT token using a secret key
function generateToken(payload, secretKey) {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });  // token valid for 1 day
}

// verifyToken will verify JWT token
function verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
