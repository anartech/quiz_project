var models = require('../models/loader.js');

//GET /api/all
exports.all = function(req, res) {
  console.log(The host is: req.get('host'));
  // console.log(origin);
  // res.header('Access-Control-Allow-Origin', origin);
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  models.apicomments.findAll().then(
    function(comments) {
      res.json(comments);
    }
  ).catch(function(error) { next(error); });
};
