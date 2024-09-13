const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;