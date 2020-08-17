const router = require('express').Router();
const { likeQuestion } = require('../controllers/question');
const { likeAnswer } = require('../controllers/answer');
const { validate } = require('../middlewares/validateError');
const { auth } = require('../middlewares/authentication');
router.put('/ratings/questions', auth, validate, likeQuestion);
router.put('/ratings/answers', auth, validate, likeAnswer);
module.exports = router;