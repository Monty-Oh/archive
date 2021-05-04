<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<html>
<head>
<title>51725</title>
<style type="text/css">
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
body{
	font-family:'Noto Sans KR';
	text-align:center
}
</style>
</head>
<body>
	<br><br>
	<h1>뮤직 클라우드 로그인 페이지</h1>
	<br><hr><br>
	<form action="/WebServiceProject/Login_controller" method="post" >
		<fieldset>
		<br><br>
		아이디 &nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="id" width=700 size=20>
		<br><br> 
		비밀번호 &nbsp;&nbsp;&nbsp;&nbsp;<input type="password" name="password" width=700 size=20>
		<br><br><br>
		</fieldset>	
		<br>
		<input type="hidden" name="action" value="login">
		<input type="image" src="C:/Users/8308-13/eclipse-workspace2/WebServiceProject/buttonimg/flat1.png" value="로그인">
	</form>
	<form action="/WebServiceProject/Login_controller" method="post">
		 <input type="hidden" name="action" value="join">
		 <input type="image" src="C:/Users/8308-13/eclipse-workspace2/WebServiceProject/buttonimg/flat2.png" value="회원가입">
		 <!= controller - login_join - controller - login_join_success =>
	</form>
	<form action="/WebServiceProject/Login_controller" method="post">
		 <input type="hidden" name="action" value="find">
		 <input type="image" src="C:/Users/8308-13/eclipse-workspace2/WebServiceProject/buttonimg/flat3.png" value="아이디/비밀번호 찾기">
	</form>
	<br><br><br>
</body>
</html>