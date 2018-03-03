var models = require('../models/loader.js');

//GET /api/all
exports.all = function(req, res) {
  models.apicomments.findAll().then(
    function(comments) {
      res.end(JSON.stringify(comments));
    }
  ).catch(function(error) { next(error); });
};
