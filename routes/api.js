var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

var corsOptions = {
  origin: 'https://react-app-mc.herokuapp.com'
};

router.get('/all', cors(corsOptions), apiCtrler.all);

module.exports = router;
