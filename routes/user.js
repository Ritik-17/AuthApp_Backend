const express = require('express');
const router = express.Router();

const {login, signup} = require('../controller/Auth');
const {auth, isStudent, isAdmin} = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/login', login);

// test route
router.get('/test', auth, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route Test'
    });
})

// Protected routes
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route Student'
    });
})

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route Admin'
    });
})

module.exports = router;