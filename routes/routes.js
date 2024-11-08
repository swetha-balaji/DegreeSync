const express = require('express');
const { getHomePage, login, getSignupPage, register, getDashboardPage, logout, getCourses} = require('../controllers/mainController');
const router = express.Router();

router.get('/', getHomePage);

router.post('/login', login);

router.get('/signup', getSignupPage);

router.post('/signup', register);

router.get('/dashboard', getDashboardPage);

router.post('/logout', logout);

module.exports = router;