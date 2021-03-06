const router = require('express').Router();
const { addNewQuestion, editQuestion, deleteQuestion, getQuestions, getQuestionById, getQuestionByAuthorId, getQuestionsByCategoryId , getQuestionsByTagId, chooseBestAnswer, search} = require('../controllers/question');
const { questionValidator } = require('../validators/question');
const { validate } = require('../middlewares/validateError');
const { auth } = require('../middlewares/authentication');
router.get('/questions', validate, getQuestions);
router.post('/questions', auth, questionValidator, validate, addNewQuestion);
router.get('/questions/search', search);
router.put('/questions/:question_id', auth, questionValidator, validate, editQuestion);
router.put('/questions/:question_id/best_answer/:answer_id', auth, validate, chooseBestAnswer);
router.delete('/questions/:question_id', auth, validate, deleteQuestion);
router.get('/questions/:question_id', validate, getQuestionById);
router.get('/users/:user_id/questions', auth, validate, getQuestionByAuthorId);
router.get('/questions/categories/:category_id', validate, getQuestionsByCategoryId);
router.get('/questions/tags/:tag_id', validate, getQuestionsByTagId);

module.exports = router;
