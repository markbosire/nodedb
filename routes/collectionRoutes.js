// routes/collection.js

const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

// Add to collection
router.post('/collection', async (req, res) => {
  try {
    const { userId, gameId } = req.body;

    // Create a new collection entry
    const newCollection = new Collection({
      userId,
      gameId,
    });

    // Save the new collection entry
    await newCollection.save();

    res.status(200).json({ message: 'Added to collection successfully!', collection: newCollection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View all collections
router.get('/collections', async (req, res) => {
  try {
    // Fetch all collections
    const collections = await Collection.find();

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read collections of one user
router.get('/collections/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find collections of the specified user
    const collections = await Collection.find({ userId });

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/collection/:collectionId', async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    // Find and delete the collection entry
    const deletedCollection = await Collection.findByIdAndDelete(collectionId);

    if (!deletedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json({ message: 'Collection removed successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
