var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

db.Url.on('init', function(model) {
  var shasum = crypto.createHash('sha1');
  //this syntax needs to change
  shasum.update(model.get('url'));
  model.set('code', shasum.digest('hex').slice(0, 5));
});


module.exports = Url;









// var Url = db.Schema({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
