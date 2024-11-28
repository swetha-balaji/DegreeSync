const express = require('express');
const { getHomePage, login, getSignupPage, register, getDashboardPage, logout, getCourses, studentReport} = require('../controllers/mainController');
const router = express.Router();

router.get('/', getHomePage);

router.post('/login', login);

router.get('/signup', getSignupPage);

router.post('/signup', register);

router.get('/dashboard', getDashboardPage);

router.post('/logout', logout);

router.get('/dashboard/student-report', studentReport);

module.exports = router;