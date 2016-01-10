// modules =================================================
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var app            = express();

// configuration ===========================================
var config         = require('./app/config');
// config files
var port = process.env.PORT || config.get('port'); // set our port

// routes handlers =========================================
var mainHandle = require('./app/routes/main');
var apiHandle = require('./app/routes/api');
var userHandle = require('./app/routes/user');

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
app.use('/', mainHandle);
app.use('/api', apiHandle);
app.use('/user', userHandle);

// start app ===============================================
app.listen(port);	
console.log('Server started on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app