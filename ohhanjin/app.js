var express = require('express');
var app = express();
var config = require("./config");

var router = require('./router/main')(app);
var server = app.listen(config.port, function() {
  console.log("Express server has started on port %d", config.port);
});

app.use(express.static('public'));
