<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="user" class="myapp.UserBean" scope="request"/>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>아이디 찾기 결과</title>
</head>
<body>
	<h1>찾은 아이디는 다음과 같습니다.</h1>
	<hr>
	ID : <jsp:getProperty name="user" property="id"/>

	<br>
	<form action="/WebServiceProject/login/login.jsp" method="post">
			<input type="submit" value="확인">
		</form>
</body>
</html>