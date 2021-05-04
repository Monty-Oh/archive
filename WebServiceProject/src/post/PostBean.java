package post;

import java.io.File;

public class PostBean {
	private int postNum;
	private int ganre;
	private String songTitle;
	private File file; 
	private int fileSize;
	private int viewCount;
	
		//정보 출력
		public int getPostNum(){
			return postNum;
		}
		
		public int getGanre(){
			return ganre;
		}
		
		public String getTitle(){
			return songTitle;
		}
		
		public File getFile(){
			return file;
		}
		
		public int getFileSize(){
			return fileSize;
		}
		
		public int getViewCount(){
			return viewCount;
		}
	
		//정보 입력
		public void setPostNum(int postNum){
			this.postNum=postNum;
		}
		
		public void setGanre(int ganre){
			this.ganre=ganre;
		}
		
		public void setTitle(String songTitle){
			this.songTitle=songTitle;
		}
		
		public void setFile(File file){
			this.file=file;
		}
		
		public void setFileSize(int fileSize){
			this.fileSize=fileSize;
		}
		
		public void setViewCount(int viewCount){
			this.viewCount=viewCount;
		}
}
