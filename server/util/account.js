require('dotenv').config();
const expires = require('expires');
const Cryptr = require('cryptr');

exports.resetPasswordCryptr = new Cryptr(process.env.RESET_PASSWORD_KEY);
exports.activationCryptr = new Cryptr(process.env.ACTIVATION_KEY);

exports.generateCode = (id, cryptr) => {
	let code = cryptr.encrypt(id + '.' + expires.after('3 hours'));
	return code;
};

exports.verifyCode = (code, cryptr) => {
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
