package com.fh.controller.page;

import com.fh.controller.base.BaseController;
import com.fh.service.xtgl.CaidanService;
import com.fh.util.Const;
import com.fh.util.PageData;
import com.fh.utilmy.BeanToMapUtil;
import com.fh.utilmy.CurrentStaff;
import com.fh.utilmy.TreeBuilder;
import com.fh.utilmy.TreeBuilder.Node;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/4/30.
 */
@Controller
public class MainController extends BaseController  {
	@Resource(name="caidanService")
	private CaidanService caidanService;
    /**
     * 主页相关的跳页处理
     *    1、登录
     *    2、跳转到主页
     *    3、退出登录
     *
     *
     */
    @RequestMapping(value = "/login")
    public ModelAndView login(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("login");
        return mv;
    }

    @RequestMapping(value = "/main/index")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        
        PageData pd=this.getPageData();
        Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		CurrentStaff cuser =(CurrentStaff)session.getAttribute(Const.SESSION_USER);
		pd.put("session_user", cuser);
		try{
			List<PageData> list=caidanService.listAll(pd);
			List<Node> nodes=new ArrayList<Node>();
			for(PageData p:list){
				Node node=(Node)BeanToMapUtil.convertMap(com.fh.utilmy.TreeBuilder.Node.class, p);
				nodes.add(node);
			}
			List<Node> nodelist= new TreeBuilder().buildTreeList(nodes);
			String menuHtml="";
			for(Node node:nodelist){
				menuHtml+=CreateTree(node);
			}
			mv.addObject("menuHtml", menuHtml);
		} catch(Exception e){
			logger.error(e.toString(), e);
		}
        
        mv.setViewName("index");
        return mv;
    }


    @RequestMapping(value = "/main/main")
    public ModelAndView main(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("main");
        return mv;
    }

    @RequestMapping(value = "logout")
    public ModelAndView logout(){
        ModelAndView mv = new ModelAndView();
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();
        session.removeAttribute(Const.SESSION_USER);
        mv.setViewName("login");
        return mv;
    }

    private String CreateTree(TreeBuilder.Node node){
    	String ret="";
    	 if(node != null){
    		 if(node.getChildren()!=null && node.getChildren().size()>0){
    			 ret+="<li>";
    			 ret+="<a href=\"javascript:void(0);\" class=\"menu-toggle\">";
    			 if(node.getMenu_icon()!=null && node.getMenu_icon().length()>0){
    				 ret+="<i class=\"zmdi "+node.getMenu_icon()+"\"></i>";
    			 }
    			 ret+="<span>"+node.getName()+"</span></a>";
    			 ret+="<ul class=\"ml-menu\">";
          		 for(int j=0;j<node.getChildren().size();j++){
          			ret += CreateTree(node.getChildren().get(j));
          		 }
          		ret += "</ul>";
          		ret += "</li>";
    		 }else{
    			ret +="<li>";
    			ret += "<a href=\"javascript:void(0);\" onclick=\"toUrl('"+node.getUrl()+"')\" ><span>"+node.getName()+"</span></a>";
    			ret += "</li>";
    		 }
    	 }
    	
    	return ret;
    	
    }
}
