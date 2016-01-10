/**
 * Created by ihor on 09.01.16.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;