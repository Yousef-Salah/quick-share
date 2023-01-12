const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.user_login_get);

router.get('/register', authController.user_create_get);

router.post('/user/create', authController.user_create_post);

router.post('/user/login', authController.user_login_post);

module.exports = router;