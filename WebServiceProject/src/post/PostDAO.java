package post;

import java.io.File;

public interface PostDAO {
	//�Խñ� �ۼ�
	public boolean postWrite(int ganre, String songTitle,
			File file, int fileSize, int viewCount);
	
	//�Խñ� ����
	public boolean postDelete(int postNum);
	
	//�Խñ� ����
	
	
	//�Խñ� �ҷ�����
	
	public PostBean getpost(int postNum);
}
