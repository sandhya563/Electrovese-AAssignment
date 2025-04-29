const { verifyToken } = require('../utils/jwtUtil');
const redis = require('../config/redis');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token missing' });

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        // check Redis if token exists
        const redisToken = await redis.get(`user:${decoded.id}`);
        if (redisToken !== token) {
            return res.status(401).json({ message: 'Session expired, please login again' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateToken;
