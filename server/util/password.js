const bcrypt = require('bcrypt');
const round = 10;
const number_ascii_range = [48, 57];
const upper_char_asciii_range = [65, 90];
const lower_char_asciii_range = [97, 122];
const generating_round = 20;
const password_length = 8;

exports.getHashedPassword = (password) =>
	new Promise((resolve, reject) => {
		bcrypt.hash(password, round, (err, data) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(data);
			}
		});
	});

exports.comparePassword = (rawPassword, hashedPassword) =>
	new Promise((resolve, reject) => {
		bcrypt.compare(rawPassword, hashedPassword, (err, data) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(data);
			}
		});
	});

exports.ramdomPassword = () => {
	const getRandomInt = (range) => {
		let min = Math.ceil(range[0]);
		let max = Math.floor(range[1]);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	};
	const shuffle = (list) => {
		list.sort(() => Math.random() - 0.5);
		return list;
	};
	let batch = [];
	for (let i = 0; i < generating_round; i++) {
		batch.push(
			getRandomInt(number_ascii_range),
			getRandomInt(upper_char_asciii_range),
			getRandomInt(lower_char_asciii_range)
		);
	}
	batch = shuffle(batch);
	let password = String.fromCharCode(...batch.slice(0, password_length));
	return password;
};
