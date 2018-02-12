var models = require('../models/loader.js');

//Autoload - handles errors when the ID is non-existing
exports.load = function(req, res, next, commentID) {
  models.comments.find({
    where: { id: Number(commentID) }
  }).then(
    function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{
        next(new Error("Can't find comment with commentID = " + commentID))
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
      QuizId: req.params.quizID,
      UserId: req.session.user.id
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

//GET /quizes/:quizID/comments/:commentID/publish
exports.publish = function (req, res) {
  if (req.session.user.id === req.comment.UserId) {
    req.comment.published = true;
    req.comment.save({ fields: ["published"] }).then(
      function() {
        res.redirect('/quizes/' + req.params.quizID);
      }
    ).catch(function (error) { next(error) });
  } else {
    res.redirect('/quizes/' + req.params.quizID);
  }
};
