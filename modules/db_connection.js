var mysql = require('mysql');
var db_config = require('../config/db-config.json');

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

module.exports = function() {
  // get db configuration and make conncection pool
   var pool = mysql.createPool({
     host     : db_config.host,
     port     : db_config.port,
     user     : db_config.user,
     password : db_config.password,
     database : db_config.database
   });

   return {
     getConnection : function (callback) {
       pool.getConnection(callback);
     },
     end : function (callback) {
       pool.end(callback);
     }
   }
} ();
