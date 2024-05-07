// apikeyMiddleware.js
require('dotenv').config(); // Load environment variables from .env file
const apiKey = process.env.API_KEY;

const apiKeyMiddleware = (req, res, next) => {
  const requestAPIKey = req.headers['x-api-key'];

  if (!requestAPIKey || requestAPIKey !== apiKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

module.exports = apiKeyMiddleware;
