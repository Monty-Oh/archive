<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="team.MainBean"%>
    <%@page import="java.io.File"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
 	<div id="TOP" style="width:960px;height:150px;">
            <%@ include file="/home/post_write.jsp" %>
          
    </div>
    <br>
        <div id="DOWN" style="width:960px;height:900px;">
            <%@ include file="/team/main.jsp" %>
          
    </div>
    <br>  

	테스트테스트테스트
</body>
</html>