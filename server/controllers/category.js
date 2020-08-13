require('dotenv').config();
const CategotyService = require('../services/category');
const response_format = require('../util/response_format');
exports.getAllCategory = async (req, res) => {
	let category;
	try {
		category = await CategotyService.getAll();
		return res.json(
			response_format.success('Get all category succeed.', 
				category,
			)
		);
	} catch (error) {
		return res.json(response_format.error('Get all category failed'));
	}
};
