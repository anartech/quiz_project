var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

router.get('/all', cors(), apiCtrler.all);

module.exports = router;
