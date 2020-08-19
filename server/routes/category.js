const router = require('express').Router();
const { getAllCategory } = require('../controllers/category');
const { validate } = require('../middlewares/validateError');
router.get('/categories', validate, getAllCategory);
module.exports = router;