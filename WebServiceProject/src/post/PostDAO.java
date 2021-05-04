package post;

import java.io.File;

public interface PostDAO {
	//게시글 작성
	public boolean postWrite(int ganre, String songTitle,
			File file, int fileSize, int viewCount);
	
	//게시글 삭제
	public boolean postDelete(int postNum);
	
	//게시글 수정
	
	
	//게시글 불러오기
	
	public PostBean getpost(int postNum);
}
