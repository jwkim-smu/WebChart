var express = require('express');
var router = express.Router();
var logger = require('../modules/logger');
var async = require('async');

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

  var originalData;
  var noisedData;
  var errorMsg;

  var sql = require('../models/db_sql')(date, startTime, endTime);
  async.parallel([
    function(callback) {
      // originalData query
      sql.originalSelect(function(err, data){
        if(err){
          logger.error("sql error >> original select");
          callback(err);
        };
        for(var i=0; i<data.length; i++) {
          logger.debug(data[i].id + ' : ' + data[i].time + ' : ' + data[i].hr);
        }
        originalData = data;
        callback();
      })
    },
    // noisedData query
    function(callback) {
      sql.noisedSelect(function(err, data){
        if(err){
          logger.error("sql error >> noised select");
          callback(err);
        };
        for(var i=0; i<data.length; i++) {
          logger.debug(data[i].id + ' : ' + data[i].time + ' : ' + data[i].hr);
        }
        noisedData = data;
      })
    }
  ], function(err){
    if(err) logger.error(err);
    res.send({originalData:originalData, noisedData:noisedData, err:err});
  });
});

module.exports = router;
