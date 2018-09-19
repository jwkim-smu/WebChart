/*
 *  Create by DaeHo Kim on 2018-09
 */

var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./routes');

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
    new transports.File({filename: 'combined.log'})
]
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views/public'));
app.use(bodyParser());
app.use('/', routes);

// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });
//
// app.use(function(err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.render('error', {
// 		message: err.message,
// 		error: err
// 	});
// });

http.createServer(app).listen(3000);
logger.info('Server Start')
//
// app.get('/', function(req, res){
//   res.send("Welcome");
// });
//
// app.listen(3000, function(){
//   logger.info('Server Start');
// });
