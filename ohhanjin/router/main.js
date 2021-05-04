 var url = require('url');
 var path = require('path');
 var fs = require('fs');

 module.exports = function(app) {
   app.get('/', function(req, res) {
     fs.readFile('public/web/index.html', 'utf8', function(err, contents) {
       if (err) {
         console.log(err);
         res.writeHead(400);
       } else {
         var body = contents;
         res.writeHead(200);
       }
       res.end(body);
     });
   });
   app.get('/index', function(req, res) {
     fs.readFile('public/web/dist/index.html', 'utf8', function(err, contents) {
       if (err) {
         console.log(err);
         res.writeHead(400);
       } else {
         var body = contents;
         res.writeHead(200);
       }
       res.end(body);
     });
   });
 }
