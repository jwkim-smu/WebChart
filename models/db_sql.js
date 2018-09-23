var pool = require('../modules/db_connection');
var logger = require('../modules/logger');


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
