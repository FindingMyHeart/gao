package com.fh.entity.system;

public class MdUser {
	private String user_id;		//用户id
	private String user_name;	//用户名
	private String login_name;	
	private String login_password;	
	private String hospital_id;	
	private int dept_id;	
	private String dept_name;	
	private String qx_codes;	
	private int if_admin;
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getLogin_name() {
		return login_name;
	}
	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}
	public String getLogin_password() {
		return login_password;
	}
	public void setLogin_password(String login_password) {
		this.login_password = login_password;
	}
	public String getQx_codes() {
		return qx_codes;
	}
	public void setQx_codes(String qx_codes) {
		this.qx_codes = qx_codes;
	}
	public int getIf_admin() {
		return if_admin;
	}
	public void setIf_admin(int if_admin) {
		this.if_admin = if_admin;
	}
	public String getHospital_id() {
		return hospital_id;
	}
	public void setHospital_id(String hospital_id) {
		this.hospital_id = hospital_id;
	}
	public String getDept_name() {
		return dept_name;
	}
	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}
	public int getDept_id() {
		return dept_id;
	}
	public void setDept_id(int dept_id) {
		this.dept_id = dept_id;
	}
	
	
}
