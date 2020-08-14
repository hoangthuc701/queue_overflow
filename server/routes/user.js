const router = require('express').Router();
const { getUserInfoById, updateUserbyId } = require('../controllers/user');
const { userValidator } = require('../validators/user');
const { auth, verifyUser } = require('../middlewares/authentication');

router
	.route('/users/:user_id')
	.get(getUserInfoById)
	.put(
		auth,
		(req, res, next) => {
			req.user_id = req.params.user_id;
			next();
		},
		verifyUser,
		userValidator,
		updateUserbyId
	);

module.exports = router;
