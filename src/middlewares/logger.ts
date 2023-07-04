import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'verbose',
      filename: 'filelog-verbose.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'filelog-error.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;
