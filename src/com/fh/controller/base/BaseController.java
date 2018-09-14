package com.fh.controller.base;


import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.fh.entity.Page;
import com.fh.util.Logger;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;

public class BaseController{
	
	protected Logger logger = Logger.getLogger(this.getClass());

	private static final long serialVersionUID = 6357869213649815390L;
	public boolean checkQX(PageData pdUser, String qxcode){
		boolean ret=false;
		ret=(","+pdUser.getString("qx_codes")).contains(","+qxcode+",");
		return ret;
	}
	/**
	 * 得到company id
	 */
	public Map getCompanyId(PageData pdUser){
		Map ret=new HashMap();
		if(pdUser!=null){
			String hospitalId=pdUser.get("hospital_id").toString();
			ret.put("hospital_id", hospitalId);
			
		}
		return ret;
	}
	
	/**
	 * 得到PageData
	 */
	public PageData getPageData(){
		return new PageData(this.getRequest());
	}
	
	/**
	 * 得到ModelAndView
	 */
	public ModelAndView getModelAndView(){
		return new ModelAndView();
	}
	
	/**
	 * 得到request对象
	 */
	public HttpServletRequest getRequest() {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		
		return request;
	}
	public String getRequestParasString() {
		Map<String,String> params = new HashMap<String,String>();
		Map requestParams = getRequest().getParameterMap();
		String content="";
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			//valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
			params.put(name, valueStr);
			content+=name+"="+valueStr+"&";
		}
		return content;
	}
	/**
	 * 得到32位的uuid
	 * @return
	 */
	public String get32UUID(){
		
		return UuidUtil.get32UUID();
	}
	
	/**
	 * 得到分页列表的信息 
	 */
	public Page getPage(){
		
		return new Page();
	}
	
	public static void logBefore(Logger logger, String interfaceName){
		logger.info("");
		logger.info("--start==="+interfaceName);
	}
	public static void logBefore(Logger logger, String interfaceName, HttpServletRequest request){
		logger.info("");
		logger.info("---start==="+interfaceName);
		Enumeration paramNames = request.getParameterNames();  
		String paras="";
	    while (paramNames.hasMoreElements()) {  
			String paramName = (String) paramNames.nextElement();  
			String[] paramValues = request.getParameterValues(paramName);  
			if (paramValues.length > 0) {  
				String paramValue = paramValues[0];
				paras+="&" + paramName + "=" + paramValue;
			}  
	    }
	    logger.info("---start==="+interfaceName+"---paras==="+paras);
	}
	
	public static void logAfter(Logger logger){
		logger.info("---end===");
		logger.info("");
	}
	
}
