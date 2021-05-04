package myapp;

public class UserBean {
	private String id;
	private String password;
	private String birth;
	private String phone;
	//������ ��й�ȣ ã�¿�, ���̵�ã�� : �����Է�
	//��й�ȣ ã�� : ���̵�+���� �Է�
	
	public String getId(){
		return id;
	}
	public String getPassword(){
		return password;
	}
	public String getBirth(){
		return birth;
	}
	public String getPhone(){
		return phone;
	}
	///////////////////////////////////////////////
	public void setId(String id){
		this.id = id;
	}
	public void setPassword(String password){
		this.password = password;
	}
	public void setBirth(String birth){
		this.birth = birth;
	}
	public void setPhone(String phone){
		this.phone = phone;
	}
}
