package myapp;

//id, password, birth
public interface LoginDAO {
	public boolean Login(String id, String password);
	//로그인
	
	public void JoinUser(UserBean user);
	//회원가입
	
	//public void DeleteUser(UserBean user);
	//삭제
	
	public String getUserId(String phone);
	//아이디 찾기 핸드폰번호 이용
	
	public UserBean getUserPassword(String id, String birth, String phone);
	//비밀번호 찾기 아이디,생일,핸드폰번호 모두 이용
	
	public boolean User_Check(String phone);
	//중복체크
}
