var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

var corsOptions = {
  // origin: 'http://localhost:3000'
  // origin: 'https://react-app-mc.herokuapp.com'
};

// router.get('/all', cors(corsOptions), apiCtrler.all);
router.get('/all', cors(), apiCtrler.all);

module.exports = router;
