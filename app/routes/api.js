var express = require('express');
var router = express.Router();
var User = require('../models/user').User;


router.get('/users', function(req, res) {
    console.log('get users');
    User.find(function(err, users) {
        if (err) return res.status(500).send('Something broke!');
        res.json(users);
    });
});

router.post('/users', function(req, res) {
    console.log('create user');
    User.addUser(req.body, function(err, user){
        if (err) {
            if (err.code == 11000) {
                res.status(400).send('User with this E-mail is exist');
            }
        } else {
            res.status(200).send('OK')
        }
    });
});

router.get('/users/id/:id', function(req, res) {
    console.log('get user by ID');
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return res.status(400).send('No such user');
        } else {
            res.send(user);
        }
    });
});

router.get('/users/name/:name', function(req, res) {
    console.log('get user by Name');
    User.find({'username': req.params.name}, function(err, user) {
        if (user) {
            res.send(user);
        } else {
            return res.status(400).send('No such user');
        }
    });
});

router.get('/users/email/:email', function(req, res) {
    console.log('get user by E-mail');
    User.findOne({'email': req.params.email}, function(err, user) {
        if (user) {
            res.send(user);
        } else {
            return res.status(400).send('No such user');
        }
    });
});

router.put('/users/:id', function (req, res){
    console.log('Update user');

    User.findOne({ _id: req.params.id }, function (err, user){
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(function(err) {
            if (err) {
                if (err.code == 11000) {
                    res.status(400).send('User with this E-mail is exist');
                }
            } else {
                res.status(200).send('OK')
            }
        });
    });
});

router.delete('/users/:id', function (req, res){
    console.log('delete user');
    User.findById(req.params.id, function(err, user) {
        user.remove();
        res.status(200).send('Deleted');
    });
});

module.exports = router;