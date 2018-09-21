var express = require('express');
var router = express.Router();

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({ level: 'debug'}),
    new transports.File({filename: 'log/combined.log'})
 ]
});

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

  logger.debug(date + ' : ' + startTime + ' : ' + endTime);
});

module.exports = router;
