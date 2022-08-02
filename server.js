const express = require("express");
const bodyParser = require("body-parser");
const winston = require('winston');
const expressWinston = require('express-winston');
const dotenv = require('dotenv');

const routes = require('./routes-config');

dotenv.config();
const app = express();

// app configuration
app.set("port", process.env.PORT || 3000);

// setup our express application
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app routes
app.use(routes);
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}))

app.listen(app.get("port"), function () {
  const url = "http://localhost:" + app.set("port");
  console.log("Application running on port: ", app.get("port"));
});
