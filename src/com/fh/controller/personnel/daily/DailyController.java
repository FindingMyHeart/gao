package com.fh.controller.personnel.daily;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/28.
 */
@Controller
@RequestMapping(value = "daily")
public class DailyController extends BaseController{

    /********************************************************************************************************************
     * 日报管理
     *     1、新增日报
     *     2、日报列表
     *********************************************************************************************************************/

    /**
     * 1、新增日报
     */
    @RequestMapping(value="entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/daily/entry");
        return mv;
    }

    /**
     * 2、日报列表
     */
    @RequestMapping(value="list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("personnel/daily/list");
        return mv;
    }

    /**
     * 3、查看详情
     */
    @RequestMapping(value="view")
    public ModelAndView view(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/daily/view");
        return mv;
    }
}
