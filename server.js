
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');


var port = process.env.PORT || 5000;
var app = express();

app.use(serveStatic(__dirname + "/dist"));
app.listen(port);

module.exports = app;