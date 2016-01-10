var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var jwt = require('jsonwebtoken');
var tokenManager = require('../libs/tokenManager');
var config = require('../config');
var AuthError = require('../models/user').AuthError;

router.post('/signin', function(req, res) {
    console.log('sign in');
    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
        return res.send(401).send('Type E-mal and password');
    }

    User.authorize(email, password, function(err, user) {
        if(err){
            if(err instanceof AuthError) {
                return res.status(403).send('Invalid E-mail or password');
            }
        }

        var token = jwt.sign({id: user._id}, config.get('token:secret'), { expiresIn: tokenManager.TOKEN_EXPIRATION * 60 });
        return res.json({token:token});
    });

});

router.get('/logout', function(req, res) {
    console.log('log out');
    if (req.headers.authorization) {
        tokenManager.expireToken(req.headers);

        delete req.user;
        return res.send(200);
    }
    else {
        return res.send(401);
    }
});

router.post('/register', function(req, res) {

    var username = req.body.username || '';
    var email = req.body.email || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (username == '' || email == '' || password == '' || passwordConfirmation == '') {
        return res.status(400).send('Type all lines');
    }
    if (password != passwordConfirmation) {
        return res.status(400).send('Passwords do not match');
    }

    User.addUser(req.body, function(err, user){
        if (err) {
            if (err.code == 11000) {
                res.status(400).send('User with this E-mail is exist');
            }
            else {
                res.status(400).send('Unknown error');
            }
        } else {
            res.status(200).send('OK')
        }
    });

});

module.exports = router;