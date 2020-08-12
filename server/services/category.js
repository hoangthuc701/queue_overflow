const CategoryModel = require('../models/category');

class CategoryService {
	static async getById(category_id) {
		let category;
		try {
			category = await CategoryModel.find({ _id: category_id }).exec();
		} catch (error) {
			throw new Error('Cannot get category.');
		}
		return category;
	}
}

module.exports = CategoryService;