const error = (mes) => {
	return {
		message: '',
		error: mes,
		data: {},
	};
};

const success = (mes, data) => {
	return {
		message: mes,
		error: '',
		data: data,
	};
};

exports = { error, success };
