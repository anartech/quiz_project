var express = require('express');
var cors = require('cors');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//Use 'Quiz 2015' as seed to encrypt the cookies data
app.use(cookieParser('Quiz 2015'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session());

// Dynamic helpers
app.use(function(req, res, next) {
  if (!req.path.match(/\/login|\/logout|\/users\/create|\/users\/signup/)) {
    req.session.redir = req.path;
  } else {
    req.session.redir = '/quizes';
  }
  res.locals.session = req.session;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
