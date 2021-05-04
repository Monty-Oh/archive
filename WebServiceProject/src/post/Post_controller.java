package post;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/**
 * Servlet implementation class Post_controller
 */
@WebServlet("/Post_controller")
public class Post_controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBPostDAO dao = new DBPostDAO();
		String address = null;
		request.setCharacterEncoding("utf-8");
		
		String action = request.getParameter("action");
		
		
		if(action.equals("postsave")){
			PostBean post = new PostBean();
			
		}
	}
}
