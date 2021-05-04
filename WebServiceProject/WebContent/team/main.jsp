<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="team.MainBean"%>
<%@page import="java.io.File"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="mainlist" class="java.util.ArrayList" scope="request" />
<jsp:useBean id="likelist" class="java.util.ArrayList" scope="request" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>main</title>
<style type="text/css">
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
body{
	font-family:'Noto Sans KR';
	text-align:center
}
</style>
</head>
<body>
	<!--  <form action="/webservice/MainControl" method="post">
		ID <input type="text" name="id" size=5>
		Singer <input type="text" name="singer" size=15> <br>
		Title <input type="text" name="title" size=15> <br>
		Genre <input type="text" name="genre" size=10> <br>
		Content <input type="text" name="content" size=40> <br>
		Youtube_url <input type="text" name="youtube_url" size=40> <br>
		<input type="hidden" name="action" value="add">
		<input type="submit" value="글 등록">
	</form>  -->

	<!--  
	<div id="container" align="center" style="width:760px">
    	<div id="header" style="background-color:cyan; width:760px"> 
    		<%= new java.util.Date() %> 
    	</div>
    	<div id="content" style="background-color:#CF0; float: left; width: 460px; height: 400px"></div>
        <div id="sideinfo" style="background-color:blue; float: right; width: 300px; height: 400px">3 <iframe width="300" height="400" src="http://www.youtube.com/embed/KaOC9danxNo" frameborder="0"> </iframe> </div>
        <div id="footer" style="background-color:yellow;clear: both; height: 100px"></div>
    </div>
	-->
	
	<h2>어서오세요! 만든이: 컴퓨터과학과 이석주,오한진,이승준,박생재</h2><br><br><br>
	
		
	
	<div id="container" align="center" style="margin:0 auto; text-align=center; width:760px;">  
		<form action='/WebServiceProject/home/post_write_success.jsp' method="post" enctype="multipart/form-data">
		<h2>게시글 등록하기</h2>
		Singer <input type="text" name="singer" size=15> <br>
		Title <input type="text" name="title" size=15> <br>
		<br><textarea cols="40" rows="6" name="content" size=40>곡에 대한 평가를 적어주세요.</textarea> <br>
		Youtube_url <input type="text" name="youtube_url" size=40> <br>
		노래장르:
		<select name="genre">
  			<option value="Rock">Rock</option>
 		 	<option value="Ballade">Ballade</option>
 		 	<option value="Hiphop">Hiphop</option>
 		 	<option value="pop">K-pop</option>
  			<option value="J-pop" selected="selected">J-pop</option>
		</select><br>
		노래파일:<input type='file' name='songfile'/>
		<input type="submit" value="등 록"/>
	</form>
	</div><br>
	
	<div id="fixbutton" align="right">
	<button onclick="location='team/user_correct.jsp'">회원정보 수정</button>
	</div>
	<br><br>

	<%
	String filename = null;
    for (int i=0; i<likelist.size(); i++) {
		MainBean main = (MainBean)likelist.get(i);
		//파일경로는
		//C:\Users\Hanjin\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp2\wtpwebapps\WebServiceProject
		//끝에 upload 폴더 만들어야함 (프로젝트 폴더아님 )
	%>

	<center>
		<div id="container" align="left" style="width:760px; height:202px; margin-top:0px">  			
    		<div id="postinfo" style="background-color:#f0f0f0; float: left; width: 460px; height: 75px; border: 1px solid black">
    		<%= main.getTitle() %>&nbsp;-&nbsp;<%= main.getSinger() %> &nbsp;&nbsp;장르: <%= main.getGenre() %><br> 등록 시간: <%= main.getSubmit_time() %> &nbsp;&nbsp; Id: <%= main.getId() %>
    		<br><a href="team/filedown.jsp?filename=<%=main.getFilename()%>">다운로드 링크 : <%=main.getFilename()%></a>
    		</div>
    		<div id="sideinfo" style="background-color:#f0f0f0; float: right; width: 298px; height: 202px"> 
        	<iframe width="298" height="202" src="http://www.youtube.com/embed/<%= main.getYoutube_url() %>" frameborder="0"> </iframe>
        	</div>
    		<div id="content"style="background-color:#f0f0f0; float: left; width: 460px; height: 125px; border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black">
    		<br><%= main.getContent() %>
    		</div>	
   		</div>
   		<br><br>
   	</center>
		<%	}
		%>
		
	<div style="height:202px"> </div>

    <%
    for (int i=0; i<mainlist.size(); i++) {
		MainBean main = (MainBean)mainlist.get(i);
		//파일경로는
		//C:\Users\Hanjin\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp2\wtpwebapps\WebServiceProject
		//끝에 upload 폴더 만들어야함 (프로젝트 폴더아님 )
	%>

	<center>
		<div id="container" align="left" style="width:760px; height:202px; margin-top:0px">  			
    		<div id="postinfo" style="background-color:#f0f0f0; float: left; width: 460px; height: 75px; border: 1px solid black">
    		<form action="/WebServiceProject/MainControl" method="post">
				<input type="hidden" name="action" value="like">
				<input type="hidden" name="like_number" value="<%= main.getText_number() %>">
				<input type="hidden" name="like_genre" value="<%= main.getGenre() %>">
				<input type="submit" value="Like">
			</form> 
    		<%= main.getTitle() %>&nbsp;-&nbsp;<%= main.getSinger() %> &nbsp;&nbsp;장르: <%= main.getGenre() %>
    		<br> 등록 시간: <%= main.getSubmit_time() %> &nbsp;&nbsp; Id: <%= main.getId() %>
    		<br><a href="team/filedown.jsp?filename=<%=main.getFilename()%>">다운로드 링크 : <%=main.getFilename()%></a>
    		</div>
    		<div id="sideinfo" style="background-color:#f0f0f0; float: right; width: 298px; height: 202px"> 
        	<iframe width="298" height="202" src="http://www.youtube.com/embed/<%= main.getYoutube_url() %>" frameborder="0"> </iframe>
        	</div>
    		<div id="content"style="background-color:#f0f0f0; float: left; width: 460px; height: 125px; border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black">
    		<br><%= main.getContent() %>
    		</div>	
   		</div>
   		<br><br>
   	</center>
		<%	}
		%>
	
 	<center>
	<br><br><hr>
	<form action="/WebServiceProject/MainControl" method="post">
		<input type="hidden" name="action" value="list">
		<input type="submit" value="펼치기"/>
	</form>
	</center>

</body>
</html>