const router = require('express').Router();
// const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');
const { create } = require('../controllers/question');

router.post(
    '/questions',[
        
    ],
    validate,
    create
);

module.exports = router;
