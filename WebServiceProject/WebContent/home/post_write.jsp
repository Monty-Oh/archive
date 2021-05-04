<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.io.File"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>게시글 작성</title>
</head>
<body>
	<table width="100%" height="100%" border="1" cellpadding="0" cellspacing="0">
	<form action='/WebServiceProject/home/post_write_success.jsp'	method="post" enctype="multipart/form-data">
		가수이름:<input type="text" name="singer"/><br>
		노래제목:<input type="text" name="songTitle"/><br>
		노래장르:
		<select name="ganre">
  			<option value="1">Rock</option>
 		 	<option value="2">Ballade</option>
 		 	<option value="3">Hiphop</option>
 		 	<option value="4">K-pop</option>
  			<option value="5" selected="selected">J-pop</option>
		</select><br>
		첨부파일:<input type='file' name='songfile'/>
		<input type='submit' vlaue='등 록'/>
	</form>
</table>
</body>
</html>