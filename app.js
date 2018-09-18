var express = require('express');
var app = express();
var winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'combined.log'})
  ]
});

app.listen(3000);
logger.info('Server Start');
