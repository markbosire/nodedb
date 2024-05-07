const express = require('express');
const router = express.Router();
const Game = require('../models/game');

// Create a new game
router.post('/game', async (req, res) => {
  try {
    const { gameName, genre,color, gamePicBlob, onSale, developerIds, cost, developerPercentage, releaseDate } = req.body;

    // Create a new game instance
    const game = new Game({ gameName, genre,color, gamePicBlob, onSale, developerIds, cost, developerPercentage, releaseDate });

    // Save the game to the database
    await game.save();

    res.status(200).json({ message: 'Game created successfully!', game });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all games
router.get('/game', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get game by ID
router.get('/game/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/game/:id', async (req, res) => {
  try {
    // Extract properties from request body (handle optional fields gracefully)
    const { gameName, genre, color, gamePicBlob, onSale, developerIds, cost, developerPercentage, releaseDate } = req.body || {};

    // Retrieve game by ID
    const gameId = req.params.id;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update game properties selectively based on provided data
    game.gameName = gameName !== undefined ? gameName : game.gameName;
    game.genre = genre !== undefined ? genre : game.genre;
    game.color = color !== undefined ? color : game.color;
    game.gamePicBlob = gamePicBlob !== undefined ? gamePicBlob : game.gamePicBlob;
    game.onSale = onSale !== undefined ? onSale : game.onSale;
    game.developerIds = developerIds !== undefined ? developerIds : game.developerIds;
    game.cost = cost !== undefined ? cost : game.cost;
    game.developerPercentage = developerPercentage !== undefined ? developerPercentage : game.developerPercentage;
    game.releaseDate = releaseDate !== undefined ? releaseDate : game.releaseDate;

    // Save the updated game
    await game.save();

    // Respond with success message and updated game details
    res.status(200).json({ message: `${game.gameName} updated successfully!`, game });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete game by ID
router.delete('/game/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
