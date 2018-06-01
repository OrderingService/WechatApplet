package com.servlet;

public class Order {
	
	/**
	 * Names of fields in TABLE(order)
	 */
	final public static String ORDER_NUM = "orderNum";
	final public static String OBJECT_ID = "objectId";
	final public static String USERNAME = "userName";
	final public static String PRICE = "price";
	final public static String DISH_ARRAY = "dishArray";
	final public static String CREATE_DATE = "createDate";
	final public static String UPDATE_DATE = "updateDate";

	public String orderNum;
	public String objectId;
	public String userName;
	public String price;
	public String dishArray;	
	
	/**
	 * Constructor with Parameters
	 * @param orderNum
	 * @param objectId
	 * @param userName
	 * @param dishArray
	 */
	public Order(int orderNum, String objectId, String userName, float price, String dishArray) {
		this.orderNum = Integer.toString(orderNum);
		this.objectId = "'" + objectId + "'";
		this.userName = "'" + userName + "'";
		this.price = Float.toString(price);
		this.dishArray = "'" + dishArray + "'";
	}
	
}
