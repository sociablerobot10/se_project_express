const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

const requestlogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

const errorLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});
module.exports = { requestLogger, errorLogger };
