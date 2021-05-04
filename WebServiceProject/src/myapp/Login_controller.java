package myapp;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class Login_controller
 */
@WebServlet("/Login_controller")
public class Login_controller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		LoginDAO dao = new DBLoginDAO();
		String address = null;
		request.setCharacterEncoding("utf-8");
		String error="아이디가 존재 하지 않습니다.";
		HttpSession session = request.getSession();
		
		String action = request.getParameter("action");
		if(action==null||action.equals("login")){
			UserBean user = new UserBean();
			String id = request.getParameter("id");
			String password = request.getParameter("password");
			user.setId(id);
			user.setPassword(password);
			if(dao.Login(id, password)){
				request.setAttribute("user", user);
				/*******************/
				address="/MainControl";
				//로그인 성공시 본화면으로 이동 
				session.setAttribute("id", id);
			}
			else{
				address="/login/login.jsp";
				System.out.println("로그인 실패");
			}
		}//로그인 완료 화면으로 보낸다.
		
		
		else if(action.equals("join")){
			address="/login/login_join.jsp";
		}
		
		else if(action.equals("find")){
			address="/login/login_find.jsp";
		}
		
		else if(action.equals("find_id")){
			UserBean user = new UserBean();
			String phone = request.getParameter("phone");
			String id=null;
			id=dao.getUserId(phone);
			if(id==error){
				address="/login/lofin_find_fail.jsp";
			}else{
			user.setId(id);
			request.setAttribute("user", user);
			address="/login/login_find_id_success.jsp";
			}
		}
		
		else if(action.equals("find_password")){
			UserBean user = new UserBean();
			String id = request.getParameter("id");
			String birth = request.getParameter("birth");
			String phone = request.getParameter("phone");
			user = dao.getUserPassword(id, birth, phone);
			if(user.getId().equals("error")){
				address="/login/lofin_find_fail.jsp";
			}else{
			request.setAttribute("user", user);
			address="/login/login_find_password_success.jsp";
			}
		}
		
		else if(action.equals("login_join")){
			UserBean user = new UserBean();
			String id = request.getParameter("id");
			String password = request.getParameter("password");
			String birth = request.getParameter("birth");
			String phone = request.getParameter("phone");
			
			
			if(id==""||password==""||birth==""||phone==""){
				address="/login/login_join_fail.jsp";
			}
			
			else if(dao.User_Check(phone)){
				address="/login/login_join_fail2.jsp";
			}
			
			else{
				user.setId(id);
				user.setPassword(password);
				user.setBirth(birth);
				user.setPhone(phone);
				dao.JoinUser(user);
				address="/login/login_join_success.jsp";
			}
			
			//address="/login/login_find.jsp";
		}//회원가입 끝난 후, 빈것이 있나 체크
		RequestDispatcher dispatcher = request.getRequestDispatcher(address);
		dispatcher.forward(request, response);
	}

}
