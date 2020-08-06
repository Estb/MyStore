require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const logger = require("../src/helpers/loggerHelp")
const express = require('express')
const Routes = require("./routes");
const db = require('./models')
const bodyParser = require('body-parser')
const expressWinston = require('express-winston');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', Routes)


app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Something is wrong :(');
});

module.exports = app;