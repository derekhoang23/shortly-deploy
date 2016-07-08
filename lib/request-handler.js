var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Url = require('../app/models/link');

////////////ALL THE NODE ERR< RES cbs
exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchUrls = function(req, res) {
  ////retrieve the urls
  //then send back a status
  //  Url.find({}).exec(function(err,found) {});
  Urls.reset().exec(function(err, links) {
    if (err) {
      res.status(500);
    }
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

////ALL THIS WILL HAVE TO CHANGE. 
///mongoose query search:
///Kitten.find({ name: /^Fluff/ }, callback);
  Url.findOne({ url: uri }).exec(function(err, found) {
    if (found) {
      res.send(200).send(found);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        var newLink = new Url({
          url: uri,
          title: title,
          baseUrl: req.headers.origin
        });
        newLink.save(function(err, newLink) {
          if (err) {
            res.send(500, err);
          } else {
            res.status(200).send(newLink);          
          }
        });
      });
    }
  });
};

////ALL THIS WILL HAVE TO CHANGE. 
///mongoose query search:
///Kitten.find({ name: /^Fluff/ }, callback);
exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        res.redirect('/login');
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(newUser) {
          util.createSession(req, res, newUser);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
  Url.findOne({ code: req.params[0] }).exec(function(err, link) {
    if (!link) {
      res.redirect('/');
    } else {
      link.visits += 1;
      link.save(function() {
        return res.redirect(link.url);
      });
    }
  });
};