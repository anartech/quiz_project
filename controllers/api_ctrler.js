var models = require('../models/loader.js');

//GET /api/all
exports.all = function(req, res) {

  console.log(req.headers.origin);

  models.apicomments.findAll().then(
    function(comments) {
      res.json(comments);
    }
  ).catch(function(error) { next(error); });
};
