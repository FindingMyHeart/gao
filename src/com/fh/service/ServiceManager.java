package com.fh.service;

import com.fh.util.Common;


public class ServiceManager {
	
	private static ServiceManager instance = null;
	
	public static ServiceManager getInstance(){
		
		if(instance == null){
			instance = new ServiceManager();
		}
		
		return instance;
	}
	
	
	public Object getService(String beanName){
		return Common.getBean(beanName);
	}
}
