var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log('get index');
    res.sendfile('./public/index.html');
});

module.exports = router;
