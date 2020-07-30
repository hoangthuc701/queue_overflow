const router = require('express').Router();

router.route('/').get((req, res) => {
	res.json({ message: 'Hello wolrd' });
});

module.exports = router;
