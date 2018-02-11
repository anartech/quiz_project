var models = require('../models/loader.js');

//Autoload - handles errors when the ID is non-existing
exports.load = function(req, res, next, quizID) {
  models.quiz.find({
    where: { id: Number(quizID) },
    include: [{ model: models.comments }]
  }).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error("Can't find question with quizID = " + quizID));
      }
    }
  ).catch(function(error) { next(error); });
};

//GET /quizes
exports.showall = function(req, res) {
  models.quiz.findAll().then(
    function(quizes) {
      res.render('quizes/showall', {questions: quizes});
    }
  ).catch(function(error) { next(error); });
};

//GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', {question: req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
  if (req.query.answer === req.quiz.answer) {
    res.render('quizes/answer', {answer: "correct"});
  } else {
    res.render('quizes/answer', {answer: "incorrect"});
  }
};

//GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.quiz.build(
    { question: "Write your question", answer: "Write your answer" }
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.quiz.build(req.body.quiz);
  quiz.validate().then(
    function(){
        quiz.save({fields:["question","answer"]}).then(
          function() {
            res.redirect('/quizes');
          }
        );
    }
  ).catch(function(err) {
          // responds with validation errors
          if (err) {
            res.render('quizes/new', {quiz: quiz, errors: err.errors});
          }
        });
};

//GET /quizes/:id/edit
exports.edit = function(req, res) {
  res.render('quizes/edit', {quiz: req.quiz, errors: []});
};

//PUT /quizes/update
exports.update = function(req, res) {
  req.quiz.question = req.body.quiz.question;
  req.quiz.answer = req.body.quiz.answer;
  req.quiz.validate().then(
    function(){
        req.quiz.save({fields:["question","answer"]}).then(
          function() {
            res.redirect('/quizes');
          }
        );
    }
  ).catch(function(err) {
          // responds with validation errors
          if (err) {
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
          }
        });
};

//DELETE /quizes/:id
exports.delete = function(req, res) {
  req.quiz.destroy().then(
    function() {
      res.redirect('/quizes');
    }
  ).catch(function(error) { next(error)});
};
