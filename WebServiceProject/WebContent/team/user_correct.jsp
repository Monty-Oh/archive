<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<h2>비밀번호 수정</h2>
<form action="/WebServiceProject/MainControl" method="post">
		현재 비밀번호 <input type="text" name="pw" size=15> <br>
		새 비밀번호 <input type="text" name="new_pw" size=15> <br>		
		새 비밀번호 재입력 <input type="text" name="new_pw2" size=15> <br>
		<input type="hidden" name="action" value="correct_pw">
		<input type="submit" value="변경">
</form>

<h2>핸드폰 번호 수정</h2>
<form action="/WebServiceProject/MainControl" method="post">
		비밀번호 <input type="text" name="pw" size=15> <br>
		생일 <input type="text" name="birth" size=15> <br>	
		현재 핸드폰 번호 <input type="text" name="phone" size=15> <br>
		새 핸드폰 번호 <input type="text" name="new_phone" size=15> <br>
		<input type="hidden" name="action" value="correct_ph">
		<input type="submit" value="변경">
</form>

</body>
</html>