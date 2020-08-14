const CategoryModel = require('../models/category');

class CategoryService {
	static async getById(category_id) {
		let category;
		try {
			category = await CategoryModel.findOne({ _id: category_id }).exec();
		} catch (error) {
			throw new Error('Cannot get category.');
		}
		return category;
	}
	static async getAll() {
		let category;
		try {
			category = await CategoryModel.find().exec();
		} catch (error) {
			throw new Error('Cannot get category.');
		}
		return category;
	}
}

module.exports = CategoryService;