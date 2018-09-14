package com.fh.controller.afterSale;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/21.
 */
@RequestMapping(value = "afterSale")
@Controller
public class AfterSaleController extends BaseController{

    /********************************************************
     *  1、项目登记
     *  2、项目管理
     *  3、维修登记
     *  4、维修查询
     ********************************************************/
    /**
     * 1、项目登记
     */
    @RequestMapping(value = "project/entry")
    public ModelAndView xmdj(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("afterSale/xmgl/entry");
        return mv;
    }
    /**
     * 2、项目管理
     */
    @RequestMapping(value = "project/list")
    public ModelAndView xmgl(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.setViewName("afterSale/xmgl/list");
        return mv;
    }
    /**
     * 3、维修登记
     */
    @RequestMapping(value = "repair/entry")
    public ModelAndView wxdj(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("afterSale/wx/entry");
        return mv;
    }
    /**
     * 4、维修查询
     */
    @RequestMapping(value = "repair/list")
    public ModelAndView wxcx(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.setViewName("afterSale/wx/list");
        return mv;
    }

}
