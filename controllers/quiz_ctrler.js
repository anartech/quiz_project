var models = require('../models/loader.js');

//GET /quizes/question
exports.question = function(req, res) {
  models.quiz.findAll().then(function(quiz) {
    res.render('quizes/question', {question: quiz[0].question});
  });
};

//GET /quizes/answer
exports.answer = function(req, res) {
  models.quiz.findAll().then(function(quiz) {
    if (req.query.answer === quiz[0].answer) {
      res.render('quizes/answer', {answer: "Correct"});
    } else {
      res.render('quizes/answer', {answer: "Incorrect"});
    }
  })
};
