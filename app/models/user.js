var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');
var Schema = mongoose.Schema;
// db.User = ({
var usersSchema = new Schema({
  username: String,
  password: String
  //timestamp?
});

var User = mongoose.model('User', usersSchema);

//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.Schema.find({}).select('password'), function(err, isMatch) { 
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.Schema.find({}).select('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.update({'password': hash });
//       });
//   }
// });

module.exports = User;
