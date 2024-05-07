const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  color: {
    type: String,
  },
  gamePicBlob: {
    type: String, // Assuming binary data for game picture
    required: true,
  },
  onSale: {
    type: Boolean,
    required: true,
    default: false,
  },
  developerIds: {
    type: [mongoose.Schema.Types.ObjectId], // Array of user IDs referencing developers
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  developerPercentage: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
