var url = require('url');
var path = require('path');
var fs = require('fs');
var qs = require('querystring');
var mysql = require("mysql");


//public\~~ 폴더에 있는 데이터의 목록들을 가져오는 함수
//현재 쓰이지 않음
/*
function templateList(filelist) {
  var list = '';
  for (var index in filelist) {
    list = list + '<li>';
    list = list + `<a href="/?id=${filelist[index]}">${filelist[index]}</a>`;
    list = list + '</li>';
  }
  return list;
};
//테스트용, 결과값만 그대로 보내주는 메소드
var returnResult = function(err, res) {
  var result = {};
  if (err) {
    res.status(400);
    result.message = err.stack;
  } else {
    res.status(200);
    result.message = "Success";
  }
  return result;
}
*/


module.exports = function(app, pool) {
  //메인화면
  app.get('/', function(req, res) {
    fs.readFile('public/web/Renew.html', 'utf8', function(err, contents) {
      var body = contents;
      res.writeHead(200);
      res.end(body);
    });
  });

  //포트폴리오 pdf파일 열기
  app.get('/portfolio/:id', function(req, res) {
    //var result = [];
    var id = req.params.id;
    //db연결하여 db수행
    pool.getConnection(function(err, conn) {
      //id 매핑
      if (err) {
        console.log(err);
        conn.release();
      } else {
        var sql = 'SELECT path FROM portfolio WHERE id = ?';
        conn.query(sql, id, function(err, rows) {
          if (err) {
            console.log(err);
            conn.release();
          }
          //var result = returnResult(err, res);
          else {
            fs.readFile(rows[0].path, function(err, data) {
              //var body = contents;
              if (err) {
                console.log(err);
                conn.release();
              } else {
                conn.release();
                res.writeHead(200);
                res.end(data);
              }
            });
          }
        });
      }
    });
  });
  /*
    //사진 파일 불러오기 수정중
    app.get('/photo/:id', function(req, res){

    });
    */

}
