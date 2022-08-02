const winston = require("winston");

exports.logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});
