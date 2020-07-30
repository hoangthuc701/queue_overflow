const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	color: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Category', schema);
