const router = require('express').Router();
const { addNewAnswer, deleteAnswer } = require('../controllers/answer');
const { answerValidator } = require('../validators/answer');
const { validate } = require('../middlewares/validateError');
const { auth } = require('../middlewares/authentication');
router.post('/answers/:question_id', auth,  answerValidator, validate, addNewAnswer);
router.delete('/answers/:answer_id', auth, validate, deleteAnswer);
module.exports = router;