var models = require('../models/loader.js');

//Autoload - handles errors when the ID is non-existing
exports.load = function(req, res, next, commentId) {
  models.comments.find({
    where: { id: Number(commentId) }
  }).then(
    function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{
        next(new Error("Can't find comment with commentID = " + commentId))
      }
    }
  ).catch(function(error){next(error)});
};

//GET /quizes/:id/comments/new
exports.new = function(req, res) {
  res.render('comments/new', {quizID: req.params.quizID, errors: []});
};

//POST /quizes/:id/comments
exports.create = function(req, res) {
  var comment = models.comments.build(
    {
      text: req.body.comment.text,
      QuizId: req.params.quizID
    }
  );
  comment.validate().then(
    function(){
        comment.save().then(
          function() {
            res.redirect('/quizes/' + req.params.quizID);
          }
        );
    }
  ).catch(function(err) {
    // responds with validation errors
    if (err) {
      res.render('comments/new', {quizID: req.params.quizID, errors: err.errors});
    }
  });
};
