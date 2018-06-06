package com.servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class DatabaseUtil {
	
	/**
	 * Connection Parameters
	 */
	final private static String URL = "jdbc:mysql://172.18.187.232:53306/40_project"
									+ "?autoReconnect=true&useUnicode=true&characterEncoding=UTF-8&&useSSL=false";
	final private static String CLASSNAME = "com.mysql.jdbc.Driver";
	final private static String USERNAME = "user";
	final private static String PASSWORD = "123";

	/**
	 * Convert ResultSet of Menu into Json String
	 * @param result      Result set
	 * @return
	 */
	final private static String GetMenuJsonString(ResultSet result) {
		JsonArray foods[] = {new JsonArray(), new JsonArray(),
							 new JsonArray(), new JsonArray()};
		JsonArray array = new JsonArray();
		if (result == null) {
			return null;
		}
		try {
			ResultSetMetaData metaData = result.getMetaData();
			while (result.next()) {
				JsonObject tmp = new JsonObject();
				String columnName;
				for (int i = 1; i < metaData.getColumnCount(); ++i) {
					columnName = metaData.getColumnName(i+1);
					if (columnName.equals("price")) {
						tmp.addProperty(columnName, result.getFloat(i+1));
					} else {
						tmp.addProperty(columnName, result.getString(i+1));
					}
				}
				String type = result.getString("type");
				if (type.equals("泡面系列")) {
					foods[0].add(tmp);
				} else if (type.equals("开胃美味")) {
					foods[1].add(tmp);
				} else if (type.equals("主食菜色")) {
					foods[2].add(tmp);
				} else if (type.equals("饭后甜品")) {
					foods[3].add(tmp);
				}
			}
			for (int i = 0; i < 4; ++i) {
				JsonObject tmp = new JsonObject();
				if (i == 0) {
					tmp.addProperty("name", "泡面系列");
				} else if (i == 1) {
					tmp.addProperty("name", "开胃美味");
				} else if (i == 2) {
					tmp.addProperty("name", "主食菜色");
				} else if (i == 3) {
					tmp.addProperty("name", "饭后甜品");
				}
				tmp.add("foods", foods[i]);
				array.add(tmp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return array.toString();
	}
	
	/**
	 * Convert ResultSet of Order into Json String
	 * @param result      Result set
	 * @return
	 */
	final private static String GetOrderJsonString(ResultSet result) {
		JsonArray array = new JsonArray();
		if (result == null) {
			return null;
		}
		try {
			ResultSetMetaData metaData = result.getMetaData();
			while (result.next()) {
				JsonObject tmp = new JsonObject();
				String columnName, columnValue;
				for (int i = 0; i < metaData.getColumnCount(); ++i) {
					columnName = metaData.getColumnName(i+1);
					columnValue = result.getString(columnName);
					tmp.addProperty(columnName, columnValue);
				}
				array.add(tmp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return array.toString();
	}

	private Connection connector = null;
	
	private static int objectId = 160;
	
	/**
	 * Default Constructor
	 */
 	public DatabaseUtil() {
		this.connect();
	}
	
	/**
	 * (non-Javadoc)
	 * @Override
	 * @see java.lang.Object#finalize()
	 */
	public void finalize() {
		this.close();
	}
	
	/**
	 * Connect to the Database
	 * @return status
	 */
	public boolean connect() {
		try {
			Class.forName(CLASSNAME);
			connector = (Connection) DriverManager.getConnection(URL, USERNAME, PASSWORD);
			return true;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("SQLException: " + e.getMessage());
			System.out.println("SQLState: " + e.getSQLState());
		}
		return false;
	}
	
	/**
	 * Disconnect
	 */
	public void close() {
		try {
			if (!connector.isClosed()) {
				connector.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * SQL SELECT
	 * @param field            Fields of SELECT CLAUSE.
	 * @param table            Tables of FROM CLAUSE.
	 * @param condition        Conditions of WHERE CLAUSE.
	 * @param compare          ORDER CLAUSE.
	 * @param offset           LIMIT CLAUSE.
	 * @return result          Result set of the query.
	 */
	private ResultSet select(String field, String table, String condition, String compare, String offset) {
		String query = "SELECT " + field
					 + " FROM " + table;
		if (condition != null) {
			query += " WHERE " + condition;
		}
		if (compare != null) {
			query += " ORDER " + compare;
		}
		if (offset != null) {
			query += " LIMIT " + offset;
		}
		query += ";";
		
		ResultSet result = null;
		try {
			Statement stat = connector.createStatement();
			result = stat.executeQuery(query);
			// stat.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * SQL DELETE
	 * @param table            Tables of DELETE CLAUSE.
	 * @param condition        Conditions of WHERE CLAUSE.
	 * @return updatedCol      Number of columns updated in this deletion
	 */
	private boolean delete(String table, String condition) {
		String query = "DELETE FROM " + table
					 + " WHERE " + condition + ";";
		try {
			Statement stat = connector.createStatement();
			int updatedCol = stat.executeUpdate(query);
			stat.close();
			return updatedCol != 0;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * SQL INSERT
	 * @param table            Tables of INSERT CLAUSE.
	 * @param value            Values of VALUES CLAUSE.
	 * @return updatedCol      Number of columns updated in this insertion
	 */
	private boolean insert(String table, String value) {
		String query = "INSERT INTO " + table
					 + " VALUES(" + value + ");";
		try {
			Statement stat = connector.createStatement();
			int updatedCol = stat.executeUpdate(query);
			stat.close();
			return updatedCol != 0;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * SQL UPDATE
	 * @param table            Tables of UPDATE CLAUSE.
	 * @param value            Assignments of SET CLAUSE.
	 * @param condition        Conditions of WHERE CLAUSE.
	 * @return updatedCol      Number of columns updated in this insertion
	 */
	private boolean update(String table, String assignment, String condition) {
		String query = "UPDATE " + table
					 + " SET " + assignment
					 + " WHERE " + condition + ";";
		try {
			Statement stat = connector.createStatement();
			int updatedCol = stat.executeUpdate(query);
			stat.close();
			return updatedCol != 0;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * Get Menu
	 * @return
	 */
	public String getMenu() {
		String field = "*";
		String table = "menu";
		ResultSet result = this.select(field, table, null, null, null);
		return GetMenuJsonString(result);
	}

	/**
	 * Get Order
	 * @return
	 */
	public String getOrder() {
		String field = "*";
		String table = "`order`";
		ResultSet result = this.select(field, table, null, null, null);
		return GetOrderJsonString(result);
	}

	/**
	 * Create Order
	 * @param order
	 * @return status
	 */
	public boolean createOrder(Order order) {
		generateId(order);
		String table = "`order`";
		String value = order.orderNum + ","
					 + "'" + order.objectId + "',"
					 + "'" + order.userName + "',"
					 + order.price + ","
					 + "'" + order.dishArray + "',"
					 + "NOW()" + ","
					 + "NOW()";
		return this.insert(table, value);
	}
	
	/**
	 * Generate Id for Order
	 * @param order
	 */
	private void generateId(Order order) {
		Calendar c = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		order.orderNum = sdf.format(c.getTime()) + Integer.toString((int)(Math.random()*9999));
		order.objectId = Integer.toHexString(objectId++);
		order.createDate = order.updateDate = c.getTime().toString();
	}

	/**
	 * Delete Order
	 * @param orderNum      Primary Key of TABLE(order)
	 * @return status
	 */
	public boolean deleteOrder(int orderNum) {
		String table = "`order`";
		String condition = "orderNum=" + Integer.toString(orderNum);
		return this.delete(table, condition);
	}

	/**
	 * Edit Order
	 * @param order
	 * @return status
	 */
	public boolean editOrder(Order order) {
		String table = "`order`";
		String assignment = "price=" + order.price + ","
						  + "dishArray=" + "'" + order.dishArray + "',"
						  + "updateDate=" + "NOW()";
		String condition = "orderNum=" + order.orderNum;
		return this.update(table, assignment, condition);
	}

}
