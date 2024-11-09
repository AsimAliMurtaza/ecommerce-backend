const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
        console.log(products); // This will log the fetched products
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Update product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id); // Find product by ID

        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Return 404 if not found
        }

        res.json(product); // Return the found product
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

module.exports = router;
