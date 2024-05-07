const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');
const authMiddleware =require('../middleware/authMiddleware')

// Route for a buyer to put an object up for sale
router.post('/sales',authMiddleware, async (req, res) => {
  try {
    const { assetId } = req.body;
    const { gameId } = req.body;
    const sellerUserId = req.user.userId; // Obtain the seller ID from the JWT token
    console.log(sellerUserId)

    // Create a new sale document with sellerUserId obtained from JWT token
    const sale = new Sales({ assetId,gameId, sellerUserId });
    await sale.save();

    // Return success response
    res.status(200).json({ message: 'Object put up for sale successfully!', sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for someone to buy an asset
router.put('/sales/:id/buy',authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerUserId } = req.body;

    // Find the sale by ID and update the buyerUserId
    const sale = await Sales.findByIdAndUpdate(id, { buyerUserId }, { new: true });

    // Return success response
    res.status(200).json({ message: 'Asset bought successfully!', sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/sales', async (req, res) => {
  try {
    // Fetch all sales from the database
    const allSales = await Sales.find();

    // Return the list of sales
    res.status(200).json(allSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/sales/:sellerUserId', async (req, res) => {
  try {
    const sellerUserId = req.params.sellerUserId;

    // Find collections of the specified user
    const sales = await Sales.find({ sellerUserId });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/sales/:salesId', async (req, res) => {
  try {
    const salesId = req.params.salesId;

    // Find and delete the collection entry
    const deleteSales = await Sales.findByIdAndDelete(salesId);

    if (!deleteSales) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sales removed successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
