
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;


const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

instance
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    
    new winston.transports.Console(),
    
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
  exceptionHandlers: [
   
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
   
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

module.exports = logger;
