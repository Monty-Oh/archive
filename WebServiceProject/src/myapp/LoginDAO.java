package myapp;

//id, password, birth
public interface LoginDAO {
	public boolean Login(String id, String password);
	//�α���
	
	public void JoinUser(UserBean user);
	//ȸ������
	
	//public void DeleteUser(UserBean user);
	//����
	
	public String getUserId(String phone);
	//���̵� ã�� �ڵ�����ȣ �̿�
	
	public UserBean getUserPassword(String id, String birth, String phone);
	//��й�ȣ ã�� ���̵�,����,�ڵ�����ȣ ��� �̿�
	
	public boolean User_Check(String phone);
	//�ߺ�üũ
}
