const router = require('express').Router();
const { getUserInfoById, updateUserbyId } = require('../controllers/user');
const { userValidator } = require('../validators/user');
const { auth } = require('../middlewares/authentication');

router
	.route('/users/:user_id')
	.get(getUserInfoById)
	.put(
		auth,
		(req, res, next) => {
			req.user_id = req.params.user_id;
			next();
		},
		userValidator,
		updateUserbyId
	);

module.exports = router;
