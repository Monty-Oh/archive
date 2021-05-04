<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h1>아이디/비밀번호 찾기</h1>
	<hr><hr>
		<form action="/WebServiceProject/Login_controller" method="post">
		아이디 찾기
		<br><br>
		핸드폰번호<input type="text" name="phone" width=700 size=20>
		<br><br>
		<input type="hidden" name="action" value="find_id">
		<input type="submit" value="아이디 찾기">
			<hr>
	</form>
		<form action="/WebServiceProject/Login_controller" method="post">
		비밀번호 찾기
		<br><br>
		아이디<input type="text" name="id" width=700 size=20>
		<br><br>
		생일<input type="text" name="birth" width=700 size=20>
		<br><br>
		핸드폰번호<input type="text" name="phone" width=700 size=20>
		<br><br>
		<input type="hidden" name="action" value="find_password">
		<input type="submit" value="비밀번호 찾기">
	</form>
</body>
</html>