const express = require('express');
const router = express.Router();
const {
	getProducts,
	createProduct,
	updateProduct,
} = require('../services/productService');

router.get('/', async (req, res) => {
	const { name, price, quantity } = req.query;
	try {
		const products = await getProducts(name, price, quantity);
		res.status(200).json(products);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post('/', async (req, res) => {
	const { name, price, quantity } = req.body;
	try {
		const product = await createProduct(name, price, quantity);
		res.status(201).json(product);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, price, quantity } = req.body;
	try {
		const product = await updateProduct(id, name, price, quantity);
		res.status(200).json(product);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.findByIdAndDelete(id);
		res.status(200).json(product);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
module.exports = router;
