var models = require('../models/loader.js');

//Autoload - handles errors when the ID is non-existing
exports.load = function(req, res, next, id) {
  console.log(id);
  models.apicomments.find({
    where: { id: Number(id) }
  }).then(
    function(apicomment) {
      if (apicomment) {
        req.apicomment = apicomment;
        next();
      } else {
        next(new Error("Can't find comment with ID = " + id));
      }
    }
  ).catch(function(error) { next(error); });
};

//GET /api/comments
exports.all = function(req, res) {
  models.apicomments.findAll().then(
    function(comments) {
      res.json(comments);
    }
  ).catch(function(error) { next(error); });
};

//DELETE /api/comments/:id
exports.delete = function(req, res) {
  req.apicomment.destroy().then(
    function() {
      res.status(204).end();
    }
  ).catch(function(error) { next(error)});
};

//POST /comments
exports.create = function(req, res) {
  var apicomment = models.apicomments.build(req.body.comment);
  apicomment.validate().then(
    function() {
        apicomment.save({fields:["author","body"]}).then(
          function() {
            res.status(204).end();
          }
        );
    }
  ).catch(function(error) { next(error)});
};
