package myapp;
import java.sql.*;


public class DBLoginDAO implements LoginDAO {
	private String jdbc_driver="com.mysql.jdbc.Driver";
	private String jdbc_url="jdbc:mysql://localhost:3307/mydb?characterEncoding=utf8";
	private Connection conn;
	private Statement stmt;
	
	
	//�����ͺ��̽� ����
	private void connect(){
		try{
			Class.forName(jdbc_driver);
			conn = DriverManager.getConnection(jdbc_url,"root","kgu123");
			stmt = conn.createStatement();
			
		} catch (Exception e){
			System.out.println("DBLoginDAO.connect() ����");
			e.printStackTrace();
		}
	}
	
	
	//�����ͺ��̽� ���� ����
	private void disconnect(){
		try{
		stmt.close();
		conn.close();
		} catch (Exception e){
			System.out.println("DBLoginDAO.disconnect() ����");
			e.printStackTrace();
		}
	}
	
	//�α���
	public boolean Login(String id, String password){
		String sql = "select password from mydb.userInfo where id = '"+id+"'";
		String id_db = null;
		String password_db = null;
		try{
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			rs.next();
			id_db = id;
			password_db = rs.getString("password");
			System.out.println(password_db);
			System.out.println(password);
			rs.close();
			disconnect();
			if(password_db.equals(password))
				return true;
		}catch(Exception e){
			System.out.println("DBLoginDAO.Login() ����");
			e.printStackTrace();
			
			return false;

		}
		return false;
	}
	
	//ȸ�� ���� ������ �Է�
	public void JoinUser(UserBean user){
		String sql = "insert into mydb.userInfo values('"
				+ user.getId() + "','"
				+ user.getPassword() + "','"
				+ user.getBirth() + "','"
				+ user.getPhone() + "');";
		
		try{
			connect();
			stmt.executeUpdate(sql);
			disconnect();
		}catch(Exception e){
			//System.out.println("DBLoginDAO.JoinUser() ����");
			//e.printStackTrace();
		}//�ߺ��϶�
	}
	
	
	
	//�ڵ�����ȣ�� �Է¹޾� �ش� ������ ���̵� ��ȯ�Ѵ�.
	public String getUserId(String phone){
		String error="���̵� ���� ���� �ʽ��ϴ�.";
		String sql = "select id from mydb.userInfo where phone = "+phone+";";
		//UserBean user = new UserBean();
		String id = null;
		try{
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			rs.next();
			id = rs.getString("id");
			rs.close();
			disconnect();
		}catch(Exception e){
			return error;
		}
		return id;
	}
	 
	
	
	//���̵� �ߺ� üũ
	public boolean User_Check(String phone){
		//UserBean user = new UserBean();
		String phone_db = null;
		String id_db = null;
		//phone_db=Integer.toString(phone);
		String sql = "select id from mydb.userInfo where phone = " + phone + ";";
		try{
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			rs.next();
			id_db = rs.getString("id");
			rs.close();
			disconnect();
			System.out.print(id_db);
		}catch(Exception e){
			//e.printStackTrace();
			//System.out.println("User_check��������");
			return false;//ã���� �ϴ� �ٰ� ���ٸ�,
		}
		return true;//�̹� ���̵� �ִٸ�,
	}
	

	//���̵�,����,�ڵ��� ��ȣ�� �Է¹ް� ������ ���� ���� ��°�� ��ȯ
	public UserBean getUserPassword(String id, String birth, String phone){
		String sql = "select id, password, birth, phone from mydb.userInfo where id='"
				+id+"' and birth='"
				+birth+"' and phone='"
				+phone+"'";
		UserBean user = new UserBean();
		UserBean user_error = new UserBean();
		user_error.setId("error");
		try{
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			rs.next();
			user.setId(rs.getString("id"));
			user.setPassword(rs.getString("password"));
			user.setBirth(rs.getString("birth"));
			user.setPhone(rs.getString("phone"));
			rs.close();
			disconnect();
		}catch(Exception e){
			System.out.println("DBLoginDAO.getUserPassword() ����");
			e.printStackTrace();
			user.setId("error");
			return user;
		}
		return user;
	}
}
