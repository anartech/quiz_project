var express = require('express');
var router = express.Router();
var apiCtrler = require('../controllers/api_ctrler');
var cors = require('cors');

router.param('id', apiCtrler.load);

// var corsOptions = {
//   origin: process.env.REACT_APP_URL,
//   methods: ['GET','DELETE']
// };

// router.get('/comments', cors(), apiCtrler.all);
router.get('/comments', apiCtrler.all);
router.post('/comments', apiCtrler.create);
// router.delete('/comments/:id(\\d+)', cors(), apiCtrler.delete);
router.delete('/comments/:id(\\d+)', apiCtrler.delete);

module.exports = router;
