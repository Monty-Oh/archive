var express = require('express');
var app = express();
var config = require("./config");
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.db,
  connectionLimit: 20,
  waitForConnections: false
});

var router = require('./router/main')(app, pool);
var server = app.listen(config.port, function() {
  console.log("Express server has started on port %d", config.port);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));
