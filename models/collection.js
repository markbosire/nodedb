// collection.js

const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
