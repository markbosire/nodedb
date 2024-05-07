const express = require('express');
const Genre = require('../models/genre');

const router = express.Router();

// POST route to create a new genre
router.post('/genres', async (req, res) => {
  try {
    const { genreName, genreImage } = req.body;
    const newGenre = new Genre({ genreName, genreImage });
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET route to fetch all genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;