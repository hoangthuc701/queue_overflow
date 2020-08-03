const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

//Route
const authRouter = require('./routes/auth.js');
app.use(authRouter);

app.use('*', (req, res) => {
	res.json({ error: 'Hello world ' });
});

app.listen(port, () => {
	console.log('Server listening to  hello' + port);
});
