require('dotenv').config();
const nodemailer = require('nodemailer');
const smtpConfig = {
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
};
class EmailService {
	static async sendTo(receiver, subject, text) {
		let mail = {
			from: process.env.EMAIL_USER,
			to: receiver,
			subject,
			text,
		};
		let result;
		try {
			const transporter = nodemailer.createTransport(smtpConfig);
			result = await transporter.sendMail(mail);
			transporter.close();
		} catch (errors) {
			console.log(errors);
			throw new Error('Can not send mail');
		}
		return result;
	}
}

module.exports = EmailService;
