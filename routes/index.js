var express = require('express');
var router = express.Router();
var quizCtrler = require('../controllers/quiz_ctrler');
var commentCtrler = require('../controllers/comment_ctrler');
var sessionCtrler = require('../controllers/session_ctrler');
var userCtrler = require('../controllers/user_ctrler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/login', sessionCtrler.new);
router.post('/login', sessionCtrler.create);
router.get('/logout', sessionCtrler.destroy);

router.get('/users/signup', userCtrler.new);
router.post('/users/create', userCtrler.create);

// Autoload with quizID as parameter in query, body or param
router.param('quizID', quizCtrler.load);
router.param('commentID', commentCtrler.load);

router.get('/quizes', quizCtrler.showall);
router.get('/quizes/new', sessionCtrler.loginRequired, quizCtrler.new);
router.post('/quizes/create', sessionCtrler.loginRequired, quizCtrler.create);
router.put('/quizes/:quizID(\\d+)', sessionCtrler.loginRequired, quizCtrler.update);
router.get('/quizes/:quizID(\\d+)', quizCtrler.show);
router.delete('/quizes/:quizID(\\d+)', sessionCtrler.loginRequired, quizCtrler.delete);
router.get('/quizes/:quizID(\\d+)/answer', quizCtrler.answer);
router.get('/quizes/:quizID(\\d+)/edit', sessionCtrler.loginRequired, quizCtrler.edit);

router.get('/quizes/:quizID(\\d+)/comments/new', sessionCtrler.loginRequired, commentCtrler.new);
router.post('/quizes/:quizID(\\d+)/comments', sessionCtrler.loginRequired, commentCtrler.create);
router.get('/quizes/:quizID(\\d+)/comments/:commentID(\\d+)/publish', sessionCtrler.loginRequired, commentCtrler.publish);

module.exports = router;
