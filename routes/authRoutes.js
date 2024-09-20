const express = require('express');
const router = express.Router();

router.get('/login', (req, res)=>{
    res.send('<h1>Login Page</h1>');
});

router.post('/login', (req, res)=>{
    res.send('<h1>Posted to Login Page</h1>');
});

router.get('/signup', (req, res)=>{
    res.send('<h1>Signup Page</h1>');
});

router.post('/signup', (req, res)=>{
    res.send('<h1>Posted to Signup Page</h1>');
});

router.get('/dashboard', (req, res)=>{
    res.send('<h1>Dashboard page');
});

module.exports = router;