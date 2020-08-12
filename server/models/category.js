const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
	},
	color: {
		type: String,
	},
});

module.exports = mongoose.model('Category', schema);
