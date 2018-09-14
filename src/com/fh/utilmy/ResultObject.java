package com.fh.utilmy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fh.util.PageData;

public class ResultObject {
	private List rows=new ArrayList<HashMap>();
	private Map entity=new HashMap();
	private String msg="";
	private int success=0;
	public List getRows() {
		return rows;
	}
	public void setRows(List rows) {
		this.rows = rows;
	}
	public Map getEntity() {
		return entity;
	}
	public void setEntity(Map entity) {
		this.entity = entity;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getSuccess() {
		return success;
	}
	public void setSuccess(int success) {
		this.success = success;
	}
	
	
}
