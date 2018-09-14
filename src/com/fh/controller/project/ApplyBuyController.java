package com.fh.controller.project;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/6/7.
 */
@RequestMapping(value="applyBuy")
@Controller
public class ApplyBuyController extends BaseController{

    /************************************************************************************************************************
     * 申购管理
     *      4.1  申购录入
     *      4.2  申购查询
     *      4.3  申购审核
     **********************************************************************************************************************/

    //4.1  申购录入
    @RequestMapping(value="entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/applyBuy/entry");
        return mv;
    }

    //4.2  申购查询
    @RequestMapping(value="list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/applyBuy/list_xyf");
        return mv;
    }

    //4.3  申购审核
    @RequestMapping(value="examine")
    public ModelAndView examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/applyBuy/examine");
        return mv;
    }


}
