var pool = require('../modules/db_connection');

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

module.exports = function (column, startTime, endTime) {
  return {
    // 함수 인자 가능한지?
    select : function(callback) {
      pool.getConnection(function(err, connection) {
        if(err){
          logger.error('db connection >> ' + err);
          return callback(err);
        }else{
          logger.debug('db connected');
          var sql = 'select * from originalData';
          connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) return callback(err);
            logger.debug('query success');
            callback(null, result);
          })
        }
      })
    },
    pool : pool
  }
}
