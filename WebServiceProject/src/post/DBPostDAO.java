package post;
import java.io.File;
import java.sql.*;


public class DBPostDAO implements PostDAO {
	private String jdbc_driver="com.mysql.jdbc.Driver";
	private String jdbc_url="jdbc:mysql://localhost:3306/mydb?characterEncoding=utf8";
	private Connection conn;
	private Statement stmt;
	
	private void connect(){
		try{
			Class.forName(jdbc_driver);
			conn = DriverManager.getConnection(jdbc_url,"root","0000");
			stmt = conn.createStatement();
			
		} catch (Exception e){
			System.out.println("DBPostDAO.connect() ����");
			e.printStackTrace();
		}
	}
	
	
	//�����ͺ��̽� ���� ����
	private void disconnect(){
		try{
		stmt.close();
		conn.close();
		} catch (Exception e){
			System.out.println("DBPostDAO.disconnect() ����");
			e.printStackTrace();
		}
	}

	
	public boolean postWrite(int ganre, String songTitle, File file, int fileSize, int viewCount){
				return true;
	}
	
	public boolean postDelete(int postNum){
		return true;
	}
	
	public PostBean getpost(int postNum){
		return 
	}
}
