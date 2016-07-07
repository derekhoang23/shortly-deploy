var db = require('../config');
var crypto = require('crypto');

db.Url.on('init', function(model) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });


});

////////////what do you wnat to call this
module.exports = Link;









// var Url = db.Schema({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
