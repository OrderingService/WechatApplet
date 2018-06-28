package com.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Update
 */
@WebServlet("/Update")
public class Update extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Update() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		
		// Instantiate a Gson object
		Gson gson = new Gson();
						
		System.out.println(new Date().toString() + ": " + request.getRemoteHost());
		DatabaseUtil DBUtil = new DatabaseUtil();
		boolean res = false;
		String function = request.getParameter("func");
		if (function.equals("editOrder")) {
			Order order = gson.fromJson(request.getReader(), Order.class);
			res = DBUtil.editOrder(order);
		}
		
		Order order = new Order(15310022, "EC3", "Eros_L", 0.0f, "好饿！");
		res = DBUtil.editOrder(order);
		
		System.out.println(res);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
