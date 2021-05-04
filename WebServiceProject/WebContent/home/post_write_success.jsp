<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
   <%
   //request.setCharacterEncoding("utf-8");
   String fileName;
   String singer=null;
   String title=null;
   String content=null;
   String youtube_url = null;
   String genre = null;
   //<form action='/WebServiceProject/home/post_write_success.jsp'>
      String path = application.getRealPath("/upload");
      //C:\Users\Hanjin\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp2\wtpwebapps\WebServiceProject
      //경로
      
      MultipartRequest mr = new MultipartRequest(
            request, path, 1024*1024*20, "utf-8",
            new DefaultFileRenamePolicy());   
      
      File s_file = mr.getFile("songfile");
      String o_name = mr.getOriginalFileName("songfile");
      fileName=s_file.getName();
      
      singer      = mr.getParameter("singer");
      title      = mr.getParameter("title");
      genre      = mr.getParameter("genre");
      content      = mr.getParameter("content");
      youtube_url   = mr.getParameter("youtube_url");
      
      
      if(singer == null||title == null){
         response.sendRedirect("/WebServiceProject/home/post_write.jsp");
         s_file.delete();
         return;
      }//둘중 빠진게 있다면,
      

      //동일한 파일명이 있을때 원래 파일명은 o_name로
      //저장된 파일명은 s_file로
      

   %>
   <h1>노래가 저장되었습니다.</h1>
   <hr>
   가수:<%=singer%>
   제목:<%=title%>
   파일명:<%=fileName%>
   유튜브:<%=youtube_url%>
   <!--
   <form action='/WebServiceProject/home/post_write.jsp' method="post">
   <input type="submit" value=취소">
   -->
   </form>
   <form action='/WebServiceProject/MainControl' method="post">
   
   <input type="hidden" name="genre" value="<%=genre%>">
   <input type="hidden" name="singer" value="<%=singer%>">
   <input type="hidden" name="title" value="<%=title%>">
   <input type="hidden" name="content" value="<%=content%>">
   <input type="hidden" name="youtube_url" value="<%=youtube_url%>">
   <input type="hidden" name="filename" value="<%=fileName%>">
   <input type="hidden" name="action" value="add">
   <input type="submit" value="확인">
   </form>
</body>
</html>