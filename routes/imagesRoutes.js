const Vibrant = require('node-vibrant');
const path = require('path');
const express = require('express');
const router = express.Router();
router.post('/getDominantColor', async (req, res) => {
    try {
      const imageUrl = req.body.imageUrl;
  
      if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
      }
  
      const palette = await Vibrant.from(imageUrl).getPalette();
      const dominantColor = palette.Vibrant.getHex();
  
      res.json({ dominantColor });
    } catch (error) {
      
      res.status(500).json({ error: error});
    }
  });
  router.get('/*', (req, res) => {
    const filePath = path.join(__dirname,"../images", decodeURIComponent(req.params[0]));
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  });

  module.exports = router;