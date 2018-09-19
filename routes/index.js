var express = require('express');
var router = express.Router();

// Main page
router.get('/', function(req, res) {
  res.render('index');
});

// Demo parameter setting page
router.get('/demoReady', function(req, res) {
  res.render('demoReady');
});

// Demo result page
router.post('/demoResult', function(req, res) {
  res.render('demoResult');
});

module.exports = router;
