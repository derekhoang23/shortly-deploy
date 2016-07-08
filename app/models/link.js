var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

//IS this line of code breaking thigns? 

//sol: var linkSchema = mongoose.Schema({ userId: ...})
var Schema = mongoose.Schema;

var urlsSchema = new Schema ({
  // userId: {type: Schema.Types.ObjectId, ref: 'Users'},
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Url', urlsSchema);

urlsSchema.pre('save', function (next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});


module.exports = Link;







