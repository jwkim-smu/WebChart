var express = require('express');
var router = express.Router();
var logger = require('../modules/logger');


// Main page
router.get('/', function(req, res) {
  res.render('index');
  logger.info(req.ip + ' view Homepage');
});

// Demo parameter setting page
router.get('/demo', function(req, res) {
  res.render('demo');
  logger.info(req.ip + ' view demo page');
});

// Demo
router.post('/demoRequest', function(req, res) {
  logger.info(req.ip + ' try demo');
  var date = req.body.date;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;

  var sql = require('../models/db_sql')(date, startTime, endTime);
  sql.select(function(err, data){
    if(err) logger.error("sql error >> select");
    else logger.debug(data);
    sql.pool.end(function(err){
      if(err) logger.error('connection pool error : close');
      else logger.info('connection pool has closed');
    })
  })
});

module.exports = router;
