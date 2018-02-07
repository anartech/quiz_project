var express = require('express');
var router = express.Router();
var quizCtrler = require('../controllers/quiz_ctrler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizCtrler.question);
router.get('/quizes/answer', quizCtrler.answer);

module.exports = router;
