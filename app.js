// app.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/gameRoutes')
const genreRoutes = require('./routes/genreRoutes')
const salesRoutes = require("./routes/salesRoute")
const imagesRoutes = require("./routes/imagesRoutes")
const collectionRoutes =require('./routes/collectionRoutes')
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware')

const app = express();
app.use(express.json());
app.use(cors())

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));



// Routes
app.use(/\/((?!images).)*/,apiKeyMiddleware);
app.use('/auth', authRoutes);
app.use('/api', gameRoutes);
app.use('/api', genreRoutes);
app.use('/api', salesRoutes);
app.use('/api', collectionRoutes);
app.use('/images',imagesRoutes)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
