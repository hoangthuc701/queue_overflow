const router = require('express').Router();
const { addNewAnswer } = require('../controllers/answer');
const { answerValidator } = require('../validators/answer');
// const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');
router.post('/answers/:question_id', answerValidator, validate, addNewAnswer);
module.exports = router;