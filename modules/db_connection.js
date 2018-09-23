var mysql = require('mysql');
var db_config = require('../config/db-config.json');
var logger = require('../modules/logger');


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
