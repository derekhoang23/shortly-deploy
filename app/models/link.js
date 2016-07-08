var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var urlsSchema = new Schema ({
  //url unique ID: autoincrement?
  userId: {type: Schema.Types.ObjectId, ref: 'Users'},
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  //timestamp?
});

var Link = mongoose.model('Url', urlsSchema);




module.exports = Link;
