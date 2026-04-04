const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/register', upload.array('shopImages', 5), register);
router.post('/login', login);

module.exports = router;