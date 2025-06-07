const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`[ $(timestamo) ] $(method) ${url}`);
    next();
};

// Export the logger middleware
module.exports = logger;