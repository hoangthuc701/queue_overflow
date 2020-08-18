const router = require('express').Router();
const { validate } = require('../middlewares/validateError');
const { auth } = require('../middlewares/authentication');
const { getImage, uploadImage } = require('../controllers/upload');
const multer = require('multer');
const upload = multer({dest: __dirname + '/../images', limits: {files: 1, fileSize:  1024 * 1024}});
router.put('/upload', upload.single('avatar'), auth, validate, uploadImage);
router.get('/upload/:user_id', validate, getImage);
module.exports = router;