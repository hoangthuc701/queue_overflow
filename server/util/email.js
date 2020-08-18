exports.createPasswordMail = (receiver, name, link) => ({
	receiver,
	subject: '[QueueOverflow] Please reset your password',
	text: '',
	html: `
		<div style="font-family: Arial, Helvetica, sans-serif;">
			<div>Hello ${name},</div>
			<div>We heard that you lost your QueueOverflow password. Sorry about that!</div>
			<div>But don't worry! You can use the following link to reset your password:</div>
			<a href="${link}">Please click this link to reset your password</a>
			<div>If you don't use this link within 3 hours, it will expire.</div>
		</div>
	`,
});

exports.createVerificationMail = (receiver, name, link) => ({
	receiver,
	subject: '[QueueOverflow] Activate your account',
	text: '',
	html: `
		<div style="font-family: Arial, Helvetica, sans-serif;">
			<div>Hello ${name},</div>
			<div>You're almost done! There's just one more step required to verify your QueueOverflow account.</div>
			<a href="${link}">Please click this link to activate your QueueOverflow account<a/>
		</div>
		`,
});
