package com.fh.controller.project;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/21.
 */
@RequestMapping(value="project")
@Controller
public class ProjectController extends BaseController{

    /**
     *  项目管理
     *      1、项目录入  1.1.1
     *      2、项目查询  1.2.1
     */

    /**
     * 1、项目录入  1.1.1
     */
    @RequestMapping(value="entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/base/entry");
        return mv;
    }

    /**
     * 2、项目查询  1.2.1
     */
    @RequestMapping(value="list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();

        mv.addObject("pd",pd);
        mv.setViewName("project/base/list");
        return mv;
    }

    /**
     * 3、项目审批
     */
    @RequestMapping(value="examine")
    public ModelAndView examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();

        mv.addObject("pd",pd);
        mv.setViewName("project/base/examine");
        return mv;
    }


    /**
     * 3、商务查询
     */
    @RequestMapping(value="inquiry")
    public ModelAndView inquiry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();

        mv.addObject("pd",pd);
        mv.setViewName("project/base/inquiry");
        return mv;
    }

}
