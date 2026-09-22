const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    // Invalid MongoDB ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID'
        });
    }

    // Duplicate value error
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'A record with this value already exists'
        });
    }

    // Default error
    res.status(500).json({
        message: 'Something went wrong on the server'
    });
};

module.exports = errorHandler;