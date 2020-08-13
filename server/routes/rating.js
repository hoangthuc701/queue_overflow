const router = require('express').Router();
const { likeQuestion } = require('../controllers/question');
// const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');
router.put('/ratings/questions', validate, likeQuestion);
module.exports = router;