var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

var corsOptions = {
  origin: process.env.REACT_APP_URL
};

router.get('/all', cors(corsOptions), apiCtrler.all);

module.exports = router;
