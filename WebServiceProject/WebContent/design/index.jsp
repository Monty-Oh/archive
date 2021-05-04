<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>음악</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <h2 class="text-center">음악 추천</h2>
        
		<div id="alert" class="alert alert-warning alert-dismissible" style="display: none;"role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<strong>Warning!</strong> Better check yourself, you're not looking too good.
		</div>
		
		<c:choose>
			<c:when test="${ login != null}">
				<a href="/user/logout" class="btn btn-danger btn-sm"> ${ login.username }님 로그아웃 </a>
				<a href="/music/posting" class="btn btn-info btn-sm pull-right"> ${ login.username }의 뮤직 포스팅 </a>
			</c:when>
			<c:otherwise>
				<div>
					<button type="button" class="btn btn-info btn-sm"
						data-toggle="modal" data-target="#signin">
						<span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>
						로그인
					</button>

					<button type="button" class="btn btn-default btn-sm"
						data-toggle="modal" data-target="#signup">
						<span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>
						회원가입
					</button>
				</div>
			</c:otherwise>
		</c:choose>
		<!-- Modal -->
        <div class="modal fade clearfix" id="signin" tabindex="-1" role="dialog" aria-labelledby="signInLabel" aria-hidden="true ">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="signInLabel">로그인</h4>
                    </div>
					<form method="post" action="/user/login">
						<div class="modal-body">
							<div class="form-group">
								<input name="id" type="text" class="form-control" placeholder="아이디 입력">
							</div>
							<div class="form-group">
								<input name="pw" type="password" class="form-control" placeholder="비밀번호 입력">
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-primary" >로그인</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
						</div>
					</form>
				</div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade clearfix" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true ">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">회원가입</h4>
                    </div>
					<form id="joinmodal">
	                    <div class="modal-body">
	                            <div class="form-group">
	                                <input name="id" type="text" class="form-control" placeholder="아이디 입력">
	                            </div>
	                            <div class="form-group">
	                                <input name="pw" type="password" class="form-control" placeholder="비밀번호 입력">
	                            </div>
	                            <!-- <div class="form-group">
	                                <input name="name" type="password" class="form-control" placeholder="비밀번호 확인">
	                            </div>  -->
	                            <div class="form-group">
	                                <input name="name" type="text" class="form-control" placeholder="이름 입력">
	                            </div>
	                    </div>
	                    <div class="modal-footer">
	                        <button type="submit" class="btn btn-primary">회원가입</button>
	                        <button type="button" class="btn btn-default" data-dismiss="modal ">취소</button>
	                    </div>
					</form>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 10px">
        	<c:forEach var="post" items="${ posts }">
	            <div class="col-sm-6 col-md-4">
	                <div class="thumbnail">
	                    <img src="/postimg?imgname=${ post.musicimage }" alt="...">
	                    <div class="caption">
	                        <h3>${ post.musictitle  } <small>추천수 : <span class="badge" style="margin-left: 10px;">${ post.likecounts }</span></small></h3>
	                        <p> ${ post.musicreview } </p>
	                        <p>
	                        	<c:if test="${ login != null }">
									<c:choose>
										<c:when test="${post.likeid == null}">
											<a href="/music/post/like?postid=${ post.postid }" class="btn btn-primary btn-sm" role="button"> <span
												class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span style="margin-left: 5px;">추천하기</span>
											</a>
										</c:when>
										<c:otherwise>
											<a href="/music/post/dislike?postid=${ post.postid }" class="btn btn-danger btn-sm" role="button"> <span
												class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span><span style="margin-left: 5px;">추천취소</span>
											</a>
										</c:otherwise>
									</c:choose>
								</c:if>
							</p>
	                    </div>
	                </div>
	            </div>
            </c:forEach>
        </div>
    </div>
    
    <script>
    	var alert = $("#alert");
    	
    	$("#joinmodal").submit(function(e){
			e.preventDefault();
			var data = $("#joinmodal").serialize();
			console.log(data);
			$.ajax({
				type : 'POST',
				url  : '/api/user/signup',
				data : data,
				success:function(result){
					if(result.result > 0){
						alert.text('회원가입 성공!')
					}else{
						alert.text('회원가입 실패. 다시 시도해 주십시오.')
					}
					alert.show(2000).hide(2000);
					$('#signup').modal('hide');
				}
			});
    	});
    </script>
    
</body>

</html>