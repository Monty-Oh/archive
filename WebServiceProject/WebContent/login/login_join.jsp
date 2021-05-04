<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h2>이곳은 가입 화면입니다.</h2>
	<hr><hr>
	<form action="/WebServiceProject/Login_controller" method="post">
		개인정보를 기입해 주세요.
		아이디<input type="text" name="id" width=700 size=20>
		<br><br>
		비밀번호<input type="password" name="password" width=700 size=20>
		<br><br>
		생일<input type="text" name="birth" width=700 size=20>
		<br><br>
		핸드폰번호<input type="text" name="phone" width=700 size=20>		
		<br><br>
		
		<input type="hidden" name="action" value="login_join">
		<input type="submit" value="회원가입">
	</form>
</body>
</html>