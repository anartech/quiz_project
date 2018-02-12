//If user is not logged in, will not access next MW
exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

//GET login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('session/new', {errors: errors});
};

//POST login
exports.create = function (req, res) {
  var alias = req.body.alias;
  var password = req.body.password;
  var userCtrler = require ('./user_ctrler');
  userCtrler.authenticate(alias, password, function(error, user) {
    if (error) {
      req.session.errors = [{"message": "An error has occured: " + error}];
      res.redirect("/login");
    }
    req.session.user = { id: user.id, alias: user.alias};
    res.redirect(req.session.redir.toString());
  });
};

//DELETE /logout
exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect('/');
}
