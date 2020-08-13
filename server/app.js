const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const response_format = require('./util/response_format');
var cors = require('cors');

require('dotenv').config();

// connect to DB
mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('DB connected.'));

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(err.message);
});

const app = express();

//middleware
if (process.env.NODE_ENV === 'production') {
	app.use(
		logger('common', {
			stream: fs.createWriteStream('./access.log', { flags: 'a' }),
		})
	);
} else {
	app.use(logger('dev'));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//import routes
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user');

//Route
app.use(authRouter);
app.use(userRouter);

// catch 404 and forward to error handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
	res.status(404).json(response_format.error('Not found'));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({
			message: '',
			error: 'Invalid token.',
			data: {},
		});
	}
	res.json({
		message: '',
		data: {},
		error: err.message,
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server listening to ' + port);
});
