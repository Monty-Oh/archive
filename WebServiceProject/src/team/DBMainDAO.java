package team;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import myapp.UserBean;

public class DBMainDAO implements MainDAO {
	private String jdbc_driver = "com.mysql.jdbc.Driver";
	private String jdbc_url = "jdbc:mysql://localhost:3307/mydb?characterEncoding=utf8";
	private Connection conn;
	private Statement stmt;
	private ResultSet rs;
	static int s = 0;
	static int t = 5;
	
	private void connect() {
		try {
			Class.forName(jdbc_driver);
			conn = DriverManager.getConnection(jdbc_url, "root", "kgu123");
			stmt = conn.createStatement();
		} catch (Exception e) {
		}
	}
	
	private void disconnect() {
		try {
			stmt.close();
			conn.close();
		} catch (Exception e) {
		}
	}
	
	public void addMain(MainBean main) {
		String sql = "select text_number from main order by text_number desc";
		int text_number = 0;
		try {
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {		
				text_number = rs.getInt("text_number") + 1;
				break;
			}
			rs.close();
			disconnect();
		} catch (Exception e) { }
		
		DateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date today = Calendar.getInstance().getTime();        
		String reportDate = df.format(today);
	
		String sql2 = "insert into main values('"
				+ text_number + "', '"
				+ main.getId() + "', '"
				+ reportDate + "', '"
				+ main.getSinger() + "', '"
				+ main.getTitle()+ "', '"
				+ main.getGenre() + "', '"
				+ main.getContent() + "', '"
				+ main.getYoutube_url() + "', '"
				+ main.getFilename() + "')";
		try {
			connect();
			stmt.executeUpdate(sql2);
			disconnect();
		} catch (Exception e) {
		}
		t = 5;
	}
	
	public ArrayList<MainBean> getMain() {
		String sql = "SELECT text_number, id, submit_time, singer, title, genre, content, youtube_url, filename FROM main order by text_number desc LIMIT " +s+", " +t;
		ArrayList<MainBean> list = new ArrayList<MainBean>();
		try {
			connect();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				MainBean main = new MainBean();
				main.setText_number(rs.getInt("text_number"));
				main.setId(rs.getString("id"));
				main.setSubmit_time(rs.getString("submit_time"));
				main.setSinger(rs.getString("singer"));
				main.setTitle(rs.getString("title"));
				main.setGenre(rs.getString("genre"));
				main.setContent(rs.getString("content"));
				main.setYoutube_url(rs.getString("youtube_url"));
				main.setFilename(rs.getString("filename"));
				list.add(main);
			}
			t = t+5;
			rs.close();
			disconnect();
		} catch (Exception e) { }
		return list;
	}
	
	public int correctPw(UserBean pw, UserBean new_pw) {	
		String sql = "SELECT password FROM userinfo where id='"+pw.getId()+"'";
		String password = null;
		try {
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {		
				password = rs.getString("password");
				break;
			}
			rs.close();
			disconnect();
		} catch (Exception e) { }
			
		if(password.equals(pw.getPassword())) {
			String sql2 = "UPDATE userinfo SET password = '"+new_pw.getPassword()+"' WHERE id = '"+pw.getId()+"'";
			try {
				connect();
				stmt.executeUpdate(sql2);
				disconnect();
			} catch (Exception e) {
			}
		}

		else return 0;
		t = 5;
		return 1;
	}
	
	public int correctPh(UserBean ph, UserBean new_ph) {		
		String sql = "SELECT password, birth, phone FROM userinfo where id='"+ph.getId()+"'";
		String password = null;
		String birth = null;
		String phone = null;
		try {
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {		
				password = rs.getString("password");
				birth = rs.getString("birth");
				phone = rs.getString("phone");
				break;
			}
			rs.close();
			disconnect();
		} catch (Exception e) { }
		
		if(password.equals(ph.getPassword()) &&
				birth.equals(ph.getBirth()) &&
				phone.equals(ph.getPhone())) {
			String sql2 = "UPDATE userinfo SET phone = '"+new_ph.getPhone()+"' WHERE id = '"+ph.getId()+"'";
			try {
				connect();
				stmt.executeUpdate(sql2);
				disconnect();
			} catch (Exception e) {
			}
		}
			
		else return 0;
		t = 5;
		return 1;
	}
	
	public int addLike(MainBean like) {
		String sql = "SELECT id FROM like_table where id ='"+like.getId()+"' and text_number ='"+like.getText_number()+"'";
		String check = null;
		try {
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {		
				check = rs.getString("id");
				break;
			}
			rs.close();
			disconnect();
		} catch (Exception e) { }

		t = t - 5;
		if(check == null) {
			String sql2 = "insert into like_table values('"
					+ like.getId() + "', '"
					+ like.getText_number() + "', '"
					+ like.getGenre() + "')";
			try {
				connect();
				stmt.executeUpdate(sql2);
				disconnect();
			} catch (Exception e) {
			}
		}
		
		else return 0;
		
		return 1;
	}
	
	public ArrayList<MainBean> getLikemain(String id) {
		String sql = "SELECT genre FROM like_table where id = '"+id+"' group by genre order by count(*) desc";
		String favorite = null;
		try {
			connect();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {		
				favorite = rs.getString("genre");
				break;
			}
			rs.close();
			disconnect();
		} catch (Exception e) { }
		System.out.println(favorite);
		if(favorite == null) favorite = "Ballade";
		String sql2 = "SELECT text_number, id, submit_time, singer, title, genre, content, youtube_url, filename FROM main where genre = '"+favorite+"' order by text_number desc LIMIT 3";
		ArrayList<MainBean> likelist = new ArrayList<MainBean>();
		try {
			connect();
			rs = stmt.executeQuery(sql2);
			while(rs.next()) {
				MainBean main = new MainBean();
				main.setText_number(rs.getInt("text_number"));
				main.setId(rs.getString("id"));
				main.setSubmit_time(rs.getString("submit_time"));
				main.setSinger(rs.getString("singer"));
				main.setTitle(rs.getString("title"));
				main.setGenre(rs.getString("genre"));
				main.setContent(rs.getString("content"));
				main.setYoutube_url(rs.getString("youtube_url"));
				main.setFilename(rs.getString("filename"));
				likelist.add(main);
			}
			rs.close();
			disconnect();
		} catch (Exception e) { }
		return likelist;
	}
}
