package com.fh.utilmy;

public class CurrentStaff {
	private String STAFF_ID;
	private String LOGIN_NAME;	
	private String STAFF_NAME;	
	private int STAFF_LEVEL;	
	private String STAFF_STATUS;
	private String DEPT_ID;
	private String DEPT_NAME;
	private String ROLE_AUTH;
	private String STAFF_CODE;
	private String POST_NAME;
	private String JOIN_DATE;//入职时间
	private String ZHUANZHENG_DATE;//转正日期
	private String SHEBAO_DATE;//社保日期
	private String GONGJIJIN_DATE;//公积金日期
	private String  JBSYSC;//加班剩余时长

	public String getSTAFF_CODE() {
		return STAFF_CODE;
	}

	public void setSTAFF_CODE(String STAFF_CODE) {
		this.STAFF_CODE = STAFF_CODE;
	}

	public String getPOST_NAME() {
		return POST_NAME;
	}

	public void setPOST_NAME(String POST_NAME) {
		this.POST_NAME = POST_NAME;
	}

	public String getSTAFF_ID() {
		return STAFF_ID;
	}
	public void setSTAFF_ID(String sTAFF_ID) {
		STAFF_ID = sTAFF_ID;
	}
	public String getLOGIN_NAME() {
		return LOGIN_NAME;
	}
	public void setLOGIN_NAME(String lOGIN_NAME) {
		LOGIN_NAME = lOGIN_NAME;
	}
	public String getSTAFF_NAME() {
		return STAFF_NAME;
	}
	public void setSTAFF_NAME(String sTAFF_NAME) {
		STAFF_NAME = sTAFF_NAME;
	}
	public int getSTAFF_LEVEL() {
		return STAFF_LEVEL;
	}
	public void setSTAFF_LEVEL(int sTAFF_LEVEL) {
		STAFF_LEVEL = sTAFF_LEVEL;
	}
	public String getSTAFF_STATUS() {
		return STAFF_STATUS;
	}
	public void setSTAFF_STATUS(String sTAFF_STATUS) {
		STAFF_STATUS = sTAFF_STATUS;
	}
	
	public String getDEPT_ID() {
		return DEPT_ID;
	}
	public void setDEPT_ID(String dEPT_ID) {
		DEPT_ID = dEPT_ID;
	}
	public String getDEPT_NAME() {
		return DEPT_NAME;
	}
	public void setDEPT_NAME(String dEPT_NAME) {
		DEPT_NAME = dEPT_NAME;
	}
	public String getROLE_AUTH() {
		return ROLE_AUTH;
	}
	public void setROLE_AUTH(String rOLE_AUTH) {
		ROLE_AUTH = rOLE_AUTH;
	}

	public String getJOIN_DATE() {
		return JOIN_DATE;
	}

	public void setJOIN_DATE(String JOIN_DATE) {
		this.JOIN_DATE = JOIN_DATE;
	}

	public String getZHUANZHENG_DATE() {
		return ZHUANZHENG_DATE;
	}

	public void setZHUANZHENG_DATE(String ZHUANZHENG_DATE) {
		this.ZHUANZHENG_DATE = ZHUANZHENG_DATE;
	}

	public String getSHEBAO_DATE() {
		return SHEBAO_DATE;
	}

	public void setSHEBAO_DATE(String SHEBAO_DATE) {
		this.SHEBAO_DATE = SHEBAO_DATE;
	}

	public String getGONGJIJIN_DATE() {
		return GONGJIJIN_DATE;
	}

	public void setGONGJIJIN_DATE(String GONGJIJIN_DATE) {
		this.GONGJIJIN_DATE = GONGJIJIN_DATE;
	}

	public String getJBSYSC() {
		return JBSYSC;
	}

	public void setJBSYSC(String JBSYSC) {
		this.JBSYSC = JBSYSC;
	}
}
