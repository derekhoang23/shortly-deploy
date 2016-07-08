var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

//IS this line of code breaking thigns? 

//sol: var linkSchema = mongoose.Schema({ userId: ...})


var urlsSchema = mongoose.Schema ({
  // userId: {type: Schema.Types.ObjectId, ref: 'Users'},
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', urlsSchema);

urlsSchema.pre('save', function (next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  console.log('this', this);
  this.code = shasum.digest('hex').slice(0, 5);
  console.log('this.code', this.code);
  next();
});


module.exports = Link;







