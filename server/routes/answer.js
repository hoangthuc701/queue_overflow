const router = require('express').Router();
const { addNewAnswer, deleteAnswer } = require('../controllers/answer');
const { answerValidator } = require('../validators/answer');
const { validate } = require('../middlewares/validateError');
router.post('/answers/:question_id', answerValidator, validate, addNewAnswer);
router.delete('/answers/:answer_id', validate, deleteAnswer);
module.exports = router;