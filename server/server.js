const express = require('express');
const dotenv = require('dotenv');
const { mongoose } = require('mongoose');
const { Product } = require('./src/models/Product');
const productRouter = require('./src/controllers/productController');
const reportController = require('./src/controllers/reportController.js');
const mockData = require('./src/data/mockData');
const app = express();
app.use(express.json());
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const connect = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		await Product.collection.drop();
		await Product.insertMany(mockData);
		console.log(`Connected to port ${PORT}`);
		app.listen(PORT);
	} catch (err) {
		console.log(err);
	}
};

app.use('/products', productRouter);
app.use('/report', reportController);

connect();
