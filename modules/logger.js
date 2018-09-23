const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

var logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({ level: 'debug'}),
    new transports.File({filename: 'log/combined.log'})
]
});

logger.info('create logger successfully');

module.exports = logger;
