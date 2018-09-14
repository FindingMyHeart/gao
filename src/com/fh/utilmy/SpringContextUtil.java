package com.fh.utilmy;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class SpringContextUtil implements ApplicationContextAware{

	private static ApplicationContext applicationContext;
	 
    /**
     * 实现ApplicationContextAware接口的context注入函数, 将其存入静态变量.
     */
     
    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
        SpringContextUtil.applicationContext = applicationContext;
    }
 
    /**
     * 取得存储在静态变量中的ApplicationContext.
     */
    public static ApplicationContext getContext() {
        checkApplicationContext();
        return applicationContext;
    }
 
    /**
     * 从静态变量ApplicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    @SuppressWarnings("unchecked")
    public static <T> T getBean(String name) {
        checkApplicationContext();
        return (T) applicationContext.getBean(name);
    }
 
    /**
     * 从静态变量ApplicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    @SuppressWarnings("unchecked")
    public static <T> T getBean(Class<T> clazz) {
        checkApplicationContext();
        return (T) applicationContext.getBeansOfType(clazz);
    }
 
    /**   
     * 如果BeanFactory包含一个与所给名称匹配的bean定义，则返回true    
     * @param name   
     * @return boolean   
     */ 
    public static boolean containsBean(String name) { 
            return applicationContext.containsBean(name); 
    } 

    /**   
     * 判断以给定名字注册的bean定义是一个singleton还是一个prototype。   
     * 如果与给定名字相应的bean定义没有被找到，将会抛出一个异常（NoSuchBeanDefinitionException）      
     * @param name   
     * @return boolean   
     * @throws NoSuchBeanDefinitionException   
     */ 
    public static boolean isSingleton(String name) 
                    throws NoSuchBeanDefinitionException { 
            return applicationContext.isSingleton(name); 
    } 

    /**   
     * @param name   
     * @return Class 注册对象的类型   
     * @throws NoSuchBeanDefinitionException   
     */ 
    public static Class getType(String name) 
                    throws NoSuchBeanDefinitionException { 
            return applicationContext.getType(name); 
    } 
    
    private static void checkApplicationContext() {
        Assert.notNull(applicationContext,
                "applicaitonContext未注入,请在applicationContext.xml中定义SpringContextUtil");
    }
}
