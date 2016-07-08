// var path = require('path');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = ('mongodb://localhost/db');
/////////////////INTERACTION W CLIENT//////////////////////////
// MongoClient.connect(url, function(err, db) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('connectoin established');

//     /////////////MAKE A SCHEMA////////////////////////////
//     // db.close();
//   }
// });
//////////////CREATING CONNX////////////////////////////////////
var connection = mongoose.createConnection(url);
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});
module.exports = db;
///////////////////// /DEVELOPING TABLES///////////////////////

///////////URLs//////////////




// usersSchema.pre('save')

// module


// Urls.plugin(autoIncrement.plugin, 'Url');

// urlsSchema.shasum = function() {
// Url.methods.hash = function(model, attrs, options) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(model.get('url'));
//   model.set('code', shasum.digest('hex').slice(0, 5));
// };

// var google = new Urls({url: 'wwww.google.com', baseurl: '', code: 123213, title: 'goo' });
// console.log('hashed thign', google.hash());

///////////////USERS///////////

// usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.find({}).select('password'), function(err, isMatch) { 
//     callback(isMatch);
//   });
// };
// usersSchema.methods.hashPassword = function() {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.find({}).select('password'), null, null).bind(this)
//     .then(function(hash) {
//       this.Model.update({'password': hash });
//     });
// };

// usersSchema.plugin(autoIncrement.plugin, 'User');
// var User = connection.model('User', usersSchema);

// // module.exports = db;






///mongoose query search:
///Kitten.find({ name: /^Fluff/ }, callback);






