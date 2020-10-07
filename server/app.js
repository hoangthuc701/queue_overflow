const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const response_format = require('./util/response_format');
var cors = require('cors');
const cloudinary = require('cloudinary');

require('dotenv').config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

// connect to DB
const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'queueoverflow'
const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`
//connect to db 
const connectWithRetry = function () { // when using with docker, at the time we up containers. Mongodb take few seconds to starting, during that time NodeJS server will try to connect MongoDB until success.
    return mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
            setTimeout(connectWithRetry, 5000)
        }
    })
}
connectWithRetry()



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
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');
const ratingRouter = require('./routes/rating');
const categoryRouter = require('./routes/category');
const uploadRouter = require('./routes/upload');

//Route
app.use(authRouter);
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(ratingRouter);
app.use(categoryRouter);
app.use(uploadRouter);

app.post('/image-upload-single', (req, res) => {
	const { image } = req.body;
	cloudinary.uploader.upload(image).then((image) => res.json(image));
});

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
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server listening to ' + port);
});
