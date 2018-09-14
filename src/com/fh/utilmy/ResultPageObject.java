package com.fh.utilmy;

import com.fh.entity.Page;

public class ResultPageObject extends ResultObject {
	private int pageSize=0; //每页显示记录数
	private int totalPage=0;		//总页数
	private int totalResult=0;	//总记录数
	private int currentPage=0;	//当前页
	
	public void setPage(Page page) {
		this.currentPage=page.getPage();
		this.totalPage=page.getTotalPage();
		this.totalResult=page.getTotal();
		this.pageSize=page.getRows();		
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int showCount) {
		this.pageSize = showCount;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotal() {
		return totalResult;
	}

	public void setTotal(int totalResult) {
		this.totalResult = totalResult;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	
	
	
	
	
}
