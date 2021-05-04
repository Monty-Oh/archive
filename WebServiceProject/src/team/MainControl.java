package team;
import myapp.UserBean;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/MainControl")
public class MainControl extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		MainDAO dao = new DBMainDAO();
		String address =  null;
		request.setCharacterEncoding("utf-8");
		HttpSession session = request.getSession();
		String id = (String) session.getAttribute("id");
		String action = request.getParameter("action");
		
		if (action.equals("login") || action.equals("list") || action == null) {
			ArrayList<MainBean> list = dao.getMain();
			ArrayList<MainBean> likelist = dao.getLikemain(id);
			request.setAttribute("mainlist", list);
			request.setAttribute("likelist", likelist);
			address = "/team/main.jsp";
		} else if (action.equals("add")) {
			MainBean main = new MainBean();
			main.setId(id);
			main.setSinger(request.getParameter("singer"));
			main.setTitle(request.getParameter("title"));
			main.setGenre(request.getParameter("genre"));
			main.setContent(request.getParameter("content"));
			main.setFilename(request.getParameter("filename"));
			main.setYoutube_url(request.getParameter("youtube_url"));
			dao.addMain(main);
			address = "/MainControl?action=list";
		}//�Խñ۵�� - ������ �Ⱦ��°� home/post_write.jsp�� ��ü
		else if (action.equals("correct_pw")) {
			UserBean pw = new UserBean();
			UserBean new_pw = new UserBean();
			UserBean new_pw2 = new UserBean();
			
			pw.setId(id);
			pw.setPassword(request.getParameter("pw"));
			new_pw.setPassword(request.getParameter("new_pw"));
			new_pw2.setPassword(request.getParameter("new_pw2"));
			
			if(new_pw.getPassword().equals(new_pw2.getPassword())) {
				if(dao.correctPw(pw, new_pw) == 0) {
					response.setContentType("text/html; charset=UTF-8");
					PrintWriter out = response.getWriter();
					out.println("<script language='javascript'>");
					out.println("alert('현재 비밀번호와 다릅니다.');");
					out.println("location.href = 'team/user_correct.jsp';");  
					out.println("</script>"); 
					out.close();
				}
				else {
					response.setContentType("text/html; charset=UTF-8");
					PrintWriter out = response.getWriter();
					out.println("<script language='javascript'>");
					out.println("alert('비밀번호가 변경되었습니다.');");
					out.println("location.href = '/WebServiceProject/MainControl?action=list';");  
					out.println("</script>"); 
					out.close();
				}
			}
			
			else {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script language='javascript'>");
				out.println("alert('새 비밀번호 재입력을 확인해주세요.');");
				out.println("location.href = 'team/user_correct.jsp';");  
				out.println("</script>"); 
				out.close();
			}
		} else if (action.equals("correct_ph")) {
			UserBean ph = new UserBean();
			UserBean new_ph = new UserBean();
			
			ph.setId(id);
			ph.setPassword(request.getParameter("pw"));
			ph.setBirth(request.getParameter("birth"));
			ph.setPhone(request.getParameter("phone"));
			new_ph.setPhone(request.getParameter("new_phone"));
			
			if(dao.correctPh(ph, new_ph) == 0) {
					response.setContentType("text/html; charset=UTF-8");
					PrintWriter out = response.getWriter();
					out.println("<script language='javascript'>");
					out.println("alert('현재 개인정보와 다릅니다.');");
					out.println("location.href = 'team/user_correct.jsp';");  
					out.println("</script>"); 
					out.close();
			}
			
			else {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script language='javascript'>");
				out.println("alert('전화번호가 변경되었습니다.');");
				out.println("location.href = '/WebServiceProject/MainControl?action=list';");  
				out.println("</script>"); 
				out.close();
			}
		} else if (action.equals("like")) {
			MainBean main = new MainBean();
			
			main.setId(id);
			main.setText_number(Integer.parseInt(request.getParameter("like_number")));
			main.setGenre(request.getParameter("like_genre"));
			
			if(dao.addLike(main) == 1) {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script language='javascript'>");
				out.println("alert('좋아요를 누르셨습니다.');");
				out.println("location.href = '/WebServiceProject/MainControl?action=list';");  
				out.println("</script>"); 
				out.close();
			}
			
			else {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script language='javascript'>");
				out.println("alert('이미 좋아요를 누른 게시글입니다.');");
				out.println("location.href = '/WebServiceProject/MainControl?action=list';");  
				out.println("</script>"); 
				out.close();
			}
		}
		
		RequestDispatcher dispatcher = request.getRequestDispatcher(address);
		dispatcher.forward(request, response);
	}

}
