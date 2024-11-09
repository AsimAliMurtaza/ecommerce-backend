const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

// Get All Products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Update Product
router.put('/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
});

// Delete Product
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

module.exports = router;
