var pool = require('../modules/db_connection');
var logger = require('../modules/logger');


module.exports = function (date, startTime, endTime) {
  return {
    // originalSelect : function(callback) {
    //   pool.getConnection(function(err, connection) {
    //     if(err){
    //       logger.error('db connection >> ' + err);
    //       return callback(err);
    //     }else{
    //       logger.debug('db connected');
    //       var sql = 'select * from originalData';
    //       connection.query(sql, function (err, result, fields) {
    //         connection.release();
    //         if (err) return callback(err);
    //         logger.debug('original data query success');
    //         callback(null, result);
    //       })
    //     }
    //   })
    // },
    noisedSelect : function(callback) {
      pool.getConnection(function(err, connection) {
        if(err){
          logger.error('db connection >> ' + err);
          return callback(err);
        }else{
          logger.debug('db connected');
          var sql = 'SELECT hour, noisedAvg \
                     FROM avg \
                     WHERE date = \"'+date+'\" \
                     AND hour BETWEEN '+startTime+' AND '+endTime+'';
          connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) return callback(err);
            logger.debug('noised data query success');
            callback(null, result);
          })
        }
      })
    },
    pool : pool
  }
}
