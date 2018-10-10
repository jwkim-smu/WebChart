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

  var sql = require('../models/db_sql')(date, startTime, endTime);
  async.parallel({
    // // originalData query
    // originalData : function(callback) {
    //   sql.originalSelect(function(err, originalData){
    //     if(err){
    //       logger.error("sql error >> original select");
    //       callback(err);
    //     };
    //     for(var i=0; i<originalData.length; i++) {
    //       logger.debug(originalData[i].id + ' : ' + originalData[i].time + ' : ' + originalData[i].hr);
    //     }
    //     callback(null, originalData);
    //   });
    // },
    // noisedData query
    noisedData : function(callback) {
      sql.noisedSelect(function(err, noisedData){
        if(err){
          logger.error("sql error >> noised select");
          callback(err);
        };
        for(var i=0; i<noisedData.length; i++) {
          logger.debug(noisedData[i].hour + ' : ' + noisedData[i].noisedAvg);
        }
        callback(null, noisedData);
      });
    }
  }, function(err, results){
    if(err) logger.error(err);
    logger.debug("query Ok..");
    res.send({ noisedData:results['noisedData'], err:err});
  });
});

module.exports = router;
