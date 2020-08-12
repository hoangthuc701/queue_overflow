const mongoose = require('mongoose');
const QuestionService = require('./services/question');
// const UserModel = require('./models/user');
// const QuestionService = require('./models/category');

mongoose
	.connect(
		'mongodb+srv://queue-overflow:tuonggio@queue-overflow-database.tl7nr.gcp.mongodb.net/queue-overflow-database?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}
	)
	.then(async () => {
		// console.log('DB connected.');
		// const user = await UserModel.findOne({});
		// console.log(user);
		// let data = {
		// 	category: '5f2bc97a3663261d306dd098',
		// 	content: 'THUCQUEN THUCQUEN THUCQUEN THUCQUEN THUCQUEN',
		// 	tags: null,
		// 	question_id: '5f2bd015131a652b2c41c698',
		// 	title: 'THUCQUEN THUCQUEN THUCQUEN THUCQUEN',
		// };

		// QuestionService.update(data).then((data) => console.log(data));
		const value = await QuestionService.delete('5f2bcf4d13447a2138d5f90f');
		console.log(value);
	});

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(err.message);
});

// let newCategory = new CategoryModel({name: 'Cooking', color: '#cccccc'});
// newCategory.save();
// newCategory = new CategoryModel({name: 'Sport', color: '#ff9933'});
// newCategory.save();
