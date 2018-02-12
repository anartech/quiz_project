var models = require('../models/loader.js');

exports.authenticate = function(alias, password, callback) {
  models.users.find({
    where: { alias: alias }
  }).then(
    function(user) {
      if (user) {
        if (password === user.password) {
          callback(null, user);
        } else {
          callback(new Error('Wrong password'));
        }
      } else {
        callback(new Error('User not found'));
      }
    }
  );
};

//GET /users/signup
exports.new = function(req, res) {
  var user = models.users.build(
    { alias: "", password: "" }
  );
  res.render('users/new', {user: user, errors: []});
};

//POST /users/create
exports.create = function(req, res) {
  var user = models.users.build(req.body.user);
  user.validate().then(
    function(){
        user.save({fields:["alias","password"]}).then(
          function() {
            res.redirect('/login');
          }
        ).catch(function(err) {
            // responds with validation errors
            if (err.name === 'SequelizeUniqueConstraintError') {
              err.errors[0].message = 'That alias is already in use';
            }
            res.render('users/new', {user: user, errors: err.errors});
          });
    }
  ).catch(function(err) {
          // responds with validation errors
          if (err) {
            res.render('users/new', {user: user, errors: err.errors});
          }
        });
};
