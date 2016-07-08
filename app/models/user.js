var db = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


//sol: var linkSchema = mongoose.Schema({ userId: ...})
// var Schema = mongoose.Schema;
// db.User = ({

var usersSchema = mongoose.Schema({
  username: {type: String, index: {unique: true}},  //{ x: x, index: {unique: true} }
  password: String
});

var User = mongoose.model('User', usersSchema);

User.prototype.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) { 
    if (err) {
      callback(err);
    }
    callback(isMatch);
  });
};


usersSchema.pre('save', function (next) {
  var cipher = Promise.promisify(bcrypt.hash);

  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
