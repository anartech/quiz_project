var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

// var corsOptions = {
//   origin: 'react-app-mc.herokuapp.com/:1',
//   methods: 'GET',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// router.get('/all', cors(corsOptions), apiCtrler.all);
router.get('/all', cors(), apiCtrler.all);

module.exports = router;
