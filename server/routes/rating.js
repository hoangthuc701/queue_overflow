const router = require('express').Router();
const { likeQuestion } = require('../controllers/question');
const { likeAnswer } = require('../controllers/answer');
const { validate } = require('../middlewares/validateError');
router.put('/ratings/questions', validate, likeQuestion);
router.put('/ratings/answers', validate, likeAnswer);
module.exports = router;