var path = require('path');
var mongoose = require('mongoose');
var sesssions = require('mongoose-session');

exports.Schema = mongoose.Schema;

// var db = mongoose.connection;
var autoIncrement = require('mongoose-auto-increment');

exports.connection = mongoose.createConnection('mongodb://localhost:4568');
//////define db and its options?
autoIncrement.initialize(connection);
// // db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected');
//now create db (structure)


//Mongoose.collection()
         //one url would be a model? 
exports.urlSchema = new Schema ({
  //url unique ID: autoincrement?
  userId: {type: Schema.Types.ObjectId, ref: 'Users'},
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  //timestamp?
});
urlSchema.plugin(autoIncrement.plugin, 'Url');
exports.Url = connection.model('Url', urlSchema);
urlSchema.shasum = function() {

};


exports.usersSchema = new Schema({
  username: String,
  password: String
  //timestamp?
});
exports.usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.find({}).select('password'), function(err, isMatch) { 
    callback(isMatch);
  });
};
exports.usersSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.find({}).select('password'), null, null).bind(this)
    .then(function(hash) {
      this.Model.update({'password': hash });
    });
};

usersSchema.plugin(autoIncrement.plugin, 'User');
exports.User = connection.model('User', usersSchema);

// module.exports = db;
// module.exports = db;






///mongoose query search:
///Kitten.find({ name: /^Fluff/ }, callback);











// // var knex = require('knex')({
// //   client: 'sqlite3',
// //   connection: {
// //     filename: path.join(__dirname, '../db/shortly.sqlite')
// //   },
// //   useNullAsDefault: true
// // });
// // var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });\