const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Not authorized, token missing'
            });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user information in request
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized, invalid token'
        });
    }
};

module.exports = protect;