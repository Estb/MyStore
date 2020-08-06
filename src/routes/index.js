const express = require('express');
const shopkeeper = require('./shopkeeperRouter') 
const store = require("./storeRouter")
const stock = require("./stockRouter")
var app = express();


app.use('/v1', shopkeeper);
app.use('/v1', store);
app.use('/v1', stock);

module.exports = app;