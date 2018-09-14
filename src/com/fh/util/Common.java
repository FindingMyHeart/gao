package com.fh.util;

import java.math.RoundingMode;
import java.text.DecimalFormat;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

public class Common {
	//八时间的时间
	public static final int EIGHT_HOUR = 28800000;
	//一天的时间
	public static final int ONE_DAY = 86400000;
	//
	public static final int ONE_WEEK = 604800000;
	
	private final static DecimalFormat S_KB_SIZE_PATTER = new DecimalFormat("###");
	private final static DecimalFormat S_MB_SIZE_PATTER = new DecimalFormat("###.0");
	private final static DecimalFormat S_GB_SIZE_PATTER = new DecimalFormat("###.00");
	
	/**
	 * 得到srping bean 对像
	 * @param beanname
	 * @return
	 */
	public static Object getBean(String beanname) {
		Object obj = null;
		try {
			WebApplicationContext currentWebApplicationContext = ContextLoader
					.getCurrentWebApplicationContext();
			obj = currentWebApplicationContext.getBean(beanname);
		} catch (Exception e) {
			try {
				BeanFactory beanFactory = ServiceLocator.getInstance().getBeanFactory();
				if (null != beanFactory)
					obj = beanFactory.getBean(beanname);
			} catch (Exception e2) {
				e2.printStackTrace();
			}
	
		}
		return obj;
	}
	
	
	
	
	
	
	public static String formatSize(double size) {
		double t_reste = (double) (size / 1024);
		S_KB_SIZE_PATTER.setRoundingMode(RoundingMode.HALF_UP);
		S_MB_SIZE_PATTER.setRoundingMode(RoundingMode.HALF_UP);
		S_GB_SIZE_PATTER.setRoundingMode(RoundingMode.HALF_UP);
		if (t_reste == 0) {
			return "0B";
		}else if(t_reste>0 && t_reste<1){
			int intSize = (int)size;
			return Integer.toString(intSize)+"B";
		}else if (t_reste >= 1 && t_reste < 1024) {
			long KRound =  Math.round(t_reste / 1024);
			if(KRound==1024){
				return "0.9MB";
			}else{
				return S_KB_SIZE_PATTER.format(t_reste) + "KB";
				
			}
			
		} else if (t_reste >= 1024 && t_reste < 1024 * 1024) {
			long MRound = Math.round(t_reste / 1024);
			if(MRound==1024){
				return "0.99GB";
			}else{
				return S_MB_SIZE_PATTER.format(t_reste / 1024) + "MB";
			}
			
		} else if (t_reste >= 1024 * 1024) {
			return S_GB_SIZE_PATTER.format(t_reste / 1024 / 1024) + "GB";
		}
		return "0KB";
	}
	
	public static String formatIntSize(double size) {
		double t_reste = (double) (size / 1024);
		S_KB_SIZE_PATTER.setRoundingMode(RoundingMode.HALF_UP);

		if (t_reste == 0) {
			return "0B";
		}else if(t_reste>0 && t_reste<1){
			int intSize = (int)size;
			return Integer.toString(intSize)+"B";
		}else if (t_reste >= 1 && t_reste < 1024) {
			long KRound =  Math.round(t_reste / 1024);
			if(KRound==1024){
				return "0.9M";
			}else{
				return S_KB_SIZE_PATTER.format(t_reste) + "K";
			}
			
		} else if (t_reste >= 1024 && t_reste < 1024 * 1024) {
			long MRound = Math.round(t_reste / 1024);
			if(MRound==1024){
				return "0.99G";
			}else{
				return S_KB_SIZE_PATTER.format(t_reste / 1024) + "M";
			}
			
		} else if (t_reste >= 1024 * 1024) {
			return S_KB_SIZE_PATTER.format(t_reste / 1024 / 1024) + "G";
		}
		return "0KB";
	}
	 
}
