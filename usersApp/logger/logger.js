// First example
//const winston = require("winston")
// const logger = winston.createLogger(
//   {
//     format: winston.format.json(),
//     transports: [
//       new winston.transports.Console()
//     ]
//   }
// )

// Second example
// const {format, createLogger, transports} = require("winston")
// const {combine, timestamp, label, printf } = format
// const CATEGORY = "Products app logs"

// const customFormat = printf(({level, message, label, timestamp})=> {
//   return `${timestamp} [${label}: ${level}, ${message}]`
// })

// const logger = createLogger({
//   // better not do it here when application scales 
//   // difficult to track
//   //level: "warn",
//   format: combine(
//     label({label: CATEGORY}),
//     timestamp(),
//     customFormat
//   ),
//   transports: [new transports.Console()]
// })

// For Jest tests
// require("dotenv").config()

// Third Example
// Combine Transport to print at console, save to a file and save to mongoDB
require('winston-daily-rotate-file');
require("winston-mongodb")
const {format, createLogger, transports} = require("winston");
const {combine, timestamp, label, printf, prettyPrint} = format;
const CATEGORY = "Products app logs";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "7d"
});

const logger = createLogger({
  format: combine(
    label({label: "MY LABEL FOR PRODUCTS APP"}),
    timestamp({format: "DD:MM:YYYY HH:mm:sss"}),
    format.json()
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    fileRotateTransport, 
    new transports.File(
      {
        filename: "logs/example.log"
      }
    ),
    // IN CASE WE WANTED ANOTHER FILE SPECIFIED WITH LEVEL: WARN MESSAGES
    new transports.File(
      {
        level: "warn",
        filename:"logs/warn.log"
      }
    ),
    new transports.File(
      {
      level: "info",
      filename: "logs/info.log"
      }
    ),
    new transports.MongoDB(
      {
        level: "warn",
        db: process.env.MONGODB_URI,
        collection: "server_logs", 
        format: format.combine(
          format.timestamp(),
          format.json()
        )
      }
    )
  ]
});

module.exports = logger

