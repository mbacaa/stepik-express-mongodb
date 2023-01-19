const express = require('express');
const router = express.Router();
const { getReport } = require('../services/reportService');

router.get('/', async (req, res) => {
	try {
		const report = await getReport();
		return res.status(200).json(report);
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
});

module.exports = router;
