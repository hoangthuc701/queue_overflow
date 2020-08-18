require('dotenv').config();
const expires = require('expires');
const Cryptr = require('cryptr');
let cryptr = new Cryptr(process.env.URL_KEY);

exports.generateCode = (id) => {
	let code = cryptr.encrypt(id + '.' + expires.after('3 hours'));
	return code;
};

exports.verifyCode = (code) => {
	try {
		let arr = cryptr.decrypt(code).split('.');
		let result = {
			id: arr[0],
			expired: expires.expired(parseInt(arr[1])),
		};
		return result;
	} catch (errors) {
		return undefined;
	}
};
