// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware =require('../middleware/authMiddleware')

// Signup

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password} = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
   
    const token = jwt.sign({ username: user.username ,userId: user._id}, 'secretkey');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, accountType } = req.body;
    
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // If the username is unique, hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, accountType });
    await user.save();
    const token = jwt.sign({ username: user.username ,userId: user._id}, 'secretkey');
    res.status(200).json({ message: 'User created successfully!',token:token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update username or password
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { newUsername, newPassword } = req.body;
    const currentUser = req.user;

    // If newUsername is provided, check if it already exists
    if (newUsername) {
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser) {
        return res.status(400).json({ message: 'username already exists' });
      }
    }

    // Find the current user by username
    const user = await User.findOne({ username: currentUser.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update username or password if provided
    if (newUsername) {
      user.username = newUsername;
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Retrieve user information
router.get('/user', authMiddleware, async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.userId;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the username, accountType, and balance from the user object
    const { username, accountType, balance,_id } = user;

    // Respond with the user information
    res.status(200).json({ username, accountType, balance ,_id});
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});
router.post('/admin', (req, res) => {
  const { password } = req.body;

  // Check if the password matches 'admin123'
  if (password === 'admin123') {
    // If the password is correct, return an 'OK' response
    return res.status(200).json({ message: 'OK' });
  } else {
    // If the password is incorrect, return a 401 Unauthorized response
    return res.status(401).json({ error: 'Unauthorized' });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/seller/:userId',  async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.params.userId;


    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the username, accountType, and balance from the user object
    const { username, accountType, balance,_id } = user;

    // Respond with the user information
    res.status(200).json({ username, accountType, balance ,_id});
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
