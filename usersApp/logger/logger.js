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
const {format, createLogger, transports} = require("winston")
const {combine, timestamp, label, printf } = format
const CATEGORY = "Products app logs"

const customFormat = printf(({message, label, timestamp})=> {
  return `${timestamp} [${label}: ${message}]`
})

const logger = createLogger({
  // better not do it here when application scales 
  // difficult to track
  //level: "warn",
  format: combine(
    label({label: CATEGORY}),
    timestamp(),
    customFormat
  ),
  transports: [new transports.Console()]
})




module.exports = logger

