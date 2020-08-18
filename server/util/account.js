require('dotenv').config();
const expires = require('expires');
const { generateRandomPassword } = require('./password');
const Cryptr = require('cryptr');
let cryptr = new Cryptr(process.env.URL_LINK);

exports.generateCode = (id) => {
	let private_code = generateRandomPassword();
	let code = cryptr.encrypt(
		id + '.' + private_code + '.' + expires.after('3 hours')
	);
	return {
		private_code,
		code,
	};
};

exports.verifyCode = (code) => {
	try {
		let arr = cryptr.decrypt(code).split('.');
		let result = {
			id: arr[0],
			private_code: arr[1],
			expired: expires.expired(parseInt(arr[2])),
		};
		return result;
	} catch (errors) {
		return undefined;
	}
};
