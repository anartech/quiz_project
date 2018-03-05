var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

router.param('id', apiCtrler.load);

var corsOptions = {
  origin: process.env.REACT_APP_URL,
  methods: ['GET','DELETE','POST']
};

router.get('/comments', cors(corsOptions), apiCtrler.all);
// router.get('/comments', apiCtrler.all);
router.post('/comments', cors(corsOptions), apiCtrler.create);
// router.post('/comments', apiCtrler.create);
router.delete('/comments/:id(\\d+)', cors(corsOptions), apiCtrler.delete);
// router.delete('/comments/:id(\\d+)', apiCtrler.delete);

module.exports = router;
