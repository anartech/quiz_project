var express = require('express');
var router = express.Router();
var quizCtrler = require('../controllers/quiz_ctrler');
var commentCtrler = require('../controllers/comment_ctrler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload with quizID as parameter in query, body or param
router.param('quizID', quizCtrler.load);

router.get('/quizes', quizCtrler.showall);
router.get('/quizes/new', quizCtrler.new);
router.post('/quizes/create', quizCtrler.create);
router.put('/quizes/:quizID(\\d+)', quizCtrler.update);
router.get('/quizes/:quizID(\\d+)', quizCtrler.show);
router.delete('/quizes/:quizID(\\d+)', quizCtrler.delete);
router.get('/quizes/:quizID(\\d+)/answer', quizCtrler.answer);
router.get('/quizes/:quizID(\\d+)/edit', quizCtrler.edit);

router.get('/quizes/:quizID(\\d+)/comments/new', commentCtrler.new);
router.post('/quizes/:quizID(\\d+)/comments', commentCtrler.create);

module.exports = router;
