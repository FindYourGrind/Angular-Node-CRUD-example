var crypto = require('crypto');
var async =require('async');
var util =require('util');

var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function (password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function () {
		return this._plainPassword;
	});

schema.methods.checkPassword = function (password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(email, password, callback){
	var User = this;

	async.waterfall([
		function(callback) {
			User.findOne({email: email}, callback);
		},
		function(user, callback){
			if(user) {
				if(user.checkPassword(password)){
					callback(null, user);
				} else {
					callback(new AuthError(403, "Wrong password"))
				}
			} else {
				callback(new AuthError(403, "No such User"))
			}
		}
	], callback);
};

schema.statics.addUser = function(userdata, callback){
	var User = this;

	var user = new User({username:userdata.username,
						 email: userdata.email,
						 password: userdata.password});
	user.save(function(err) {
		if(err) return callback(err);
		callback(null, user);
	});
};


exports.User = mongoose.model('User', schema);

function AuthError(message) {
	Error.apply(this, arguments);
	Error.captureStackTrace(this, AuthError);

	this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;