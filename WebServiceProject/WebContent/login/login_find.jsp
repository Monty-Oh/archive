<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h1>���̵�/��й�ȣ ã��</h1>
	<hr><hr>
		<form action="/WebServiceProject/Login_controller" method="post">
		���̵� ã��
		<br><br>
		�ڵ�����ȣ<input type="text" name="phone" width=700 size=20>
		<br><br>
		<input type="hidden" name="action" value="find_id">
		<input type="submit" value="���̵� ã��">
			<hr>
	</form>
		<form action="/WebServiceProject/Login_controller" method="post">
		��й�ȣ ã��
		<br><br>
		���̵�<input type="text" name="id" width=700 size=20>
		<br><br>
		����<input type="text" name="birth" width=700 size=20>
		<br><br>
		�ڵ�����ȣ<input type="text" name="phone" width=700 size=20>
		<br><br>
		<input type="hidden" name="action" value="find_password">
		<input type="submit" value="��й�ȣ ã��">
	</form>
</body>
</html>