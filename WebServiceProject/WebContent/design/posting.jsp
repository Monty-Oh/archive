<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>음악</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<style>
#dropzone {
	border: 2px dotted #3292A2;
	width: 90%;
	height: 50px;
	color: #92AAB0;
	text-align: center;
	font-size: 24px;
	padding-top: 12px;
	margin-top: 10px;
}
</style>

<script type="text/javascript">
	$(function() {
		$("#imgInp").on('change', function() {
			readURL(this);
		});
		
		$("#blah").on('click',function(){
			$("#imgInp").click();
		});
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#blah').attr('src', e.target.result);
				var fileValue = $("#imgInp").val().split("\\");
				var fileName = fileValue[fileValue.length-1]; // 파일명
				$("#filename").text(fileName);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}
</script>

</head>
<body>
	<div class="container">
		<h2 class="text-center">포스팅</h2>
		<c:choose>
			<c:when test="${ login != null}">
				<form method="post" enctype="multipart/form-data">
					<div class="text-center">
						<input type="file" name="musicimage" id="imgInp" width="100px" style="display: none" accept="image/gif, image/jpeg, image/png">
						<div class="thumbnail">
							<img src="#" alt="클릭해서 이미지를 업로드 하세요!" id="blah" width="300px" class="img-thumbnail">
							<div class="caption" id="filename"></div>
						</div>
					</div>
					<div class="form-group">
						<label for="title">제목</label>
						<input type="text" class="form-control" name="title" id="title" placeholder="제목을 입력하세요" required="required">
					</div>
					<div class="form-group">
						<label for="reviews">내용</label>
						<textarea class="form-control" rows="20" id="reviews" name="reviews" placeholder="내용을 입력하세요"></textarea>
					</div>
					<div class="form-group">
							<button type="submit" class="btn btn-default">${ login.username }의 포스팅 업로드 하기</button>
					</div>
				</form>
			</c:when>
			<c:otherwise>
				<script type="text/javascript">
					alert('로그인을 해야 합니다. 메인 페이지로 돌아가겠..ㅎㅎ')
					location.href = "/";
				</script>
			</c:otherwise>
		</c:choose>
	</div>
</body>

</html>