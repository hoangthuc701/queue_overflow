const router = require('express').Router();
const { getAllCategory } = require('../controllers/category');
// const { questionValidator } = require('../validators/question');
// const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');
router.get('/categories', validate, getAllCategory);
module.exports = router;