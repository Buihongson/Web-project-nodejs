var express = require('express');
var router = express.Router();

router.get('/' , function(req, res){
    res.render('auth/login');
});

// register
router.get('/register', function(req, res){
    res.render('register');
});

// login
router.get('/login', function(req, res){
    res.render('auth/login');
});


module.exports = router;