const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for a simple API key
    if (!authHeader || authHeader !== `Bearer ${ process.env.API_KEY }`) {
        return res.status(401).json({
            error: 'Unauthorized Access',
            message: 'Invalid or missing API key'
        });
    }
    next();
};

// export the auth middleware
module.exports = auth;