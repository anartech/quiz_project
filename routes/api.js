var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');

router.get('/all', apiCtrler.all);

module.exports = router;
