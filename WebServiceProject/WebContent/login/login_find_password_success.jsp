<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="user" class="myapp.UserBean" scope="request"/>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>�н����� ã�� ���</title>
</head>
<body>
	<h1>ã�� �н������ ������ �����ϴ�.</h1>
	<hr>
	ID : <jsp:getProperty name="user" property="id"/>
	PW : <jsp:getProperty name="user" property="password"/>
	<br>
	<form action="/WebServiceProject/login/login.jsp" method="post">
			<input type="submit" value="Ȯ��">
		</form>
</body>
</html>