var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:4568');
var db = mongoose.connection;
//////define db and its options?

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});
//now create db (structure)

var shortlySchema = mongoose.Schema({
  name: String
});

//Mongoose.collection()
         //one url would be a model? 
var urls = new shortlySchema ({
  //unique ID: autoincrement?
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  //timestamp?
});

var users = new shortlySchema({
  //uniqueID
  username: String,
  password: String
  //timestamp?
});

var dir = console.log(__dirname);
// module.exports = db;
module.exports = db;






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