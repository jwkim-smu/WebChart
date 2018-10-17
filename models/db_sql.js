var pool = require('../modules/db_connection');
var logger = require('../modules/logger');


module.exports = function (date_from, date_to, gender) {
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
    // gender == m or f
    noisedSelectWithGender : function(callback) {
      pool.getConnection(function(err, connection) {
        if(err){
          logger.error('db connection >> ' + err);
          return callback(err);
        }else{
          logger.debug('db connected');
          var sql = 'SELECT hour, AVG(noisedAvg) as avg_noisedData \
                     FROM temp \
                     WHERE date BETWEEN "'+date_from+'" AND "'+date_to+'" \
                     AND hour BETWEEN 9 AND 22 \
                     AND gender = "'+gender+'" \
                     GROUP BY hour';
          connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) return callback(err);
            logger.debug('query success');
            callback(null, result);
          })
        }
      })
    },
    // gender == all
    noisedSelect : function(callback) {
      pool.getConnection(function(err, connection) {
        if(err){
          logger.error('db connection >> ' + err);
          return callback(err);
        }else{
          logger.debug('db connected');
          var sql = 'SELECT hour, AVG(noisedAvg) as avg_noisedData \
                     FROM temp \
                     WHERE date BETWEEN "'+date_from+'" AND "'+date_to+'" \
                     AND hour BETWEEN 9 AND 22 \
                     GROUP BY hour';
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
