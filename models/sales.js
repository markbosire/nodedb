// transfer.js

const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  assetId: {
    type: String,
    required: true,
  },
  gameId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game', // Reference to the User model assuming you have a User model
    required: true,
  },
  sellerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model assuming you have a User model
    required: true,
  },
  buyerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model assuming you have a User model
    default:null
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model('Transfer', salesSchema);

module.exports = Sales;
