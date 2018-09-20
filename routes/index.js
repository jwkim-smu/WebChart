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
    new transports.Console(),
    new transports.File({filename: 'log/combined.log'})
]
});


// Main page
router.get('/', function(req, res) {
  res.render('index');
  logger.info(req.ip + ' view Homepage');
});

// Demo parameter setting page
router.get('/demoReady', function(req, res) {
  res.render('demoReady');
  logger.info(req.ip + ' view demoReady');
});

// Demo result page
router.post('/demoResult', function(req, res) {
  res.render('demoResult');
  logger.info(req.ip + ' view demoResult');
});

module.exports = router;
