const router = require('express').Router();
const { getUserInfoById, updateUserInfo } = require('../controllers/user');
const { userValidator } = require('../validators/user');
const { auth, verifyUser } = require('../middlewares/authentication');

router
	.route('/users/:user_id')
	.get(getUserInfoById)
	.put(auth, verifyUser, userValidator, updateUserInfo);

module.exports = router;
