package com.fh.controller.personnel;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;

@Controller
@RequestMapping(value = "yjgl")
public class MailController extends BaseController{

    /********************************************************************************************************************
     * 邮件管理
     *     
     *     
     *
     ********************************************************************************************************************/
    @RequestMapping(value = "list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("personnel/yjgl/list");
        return mv;
    }
    @RequestMapping(value = "add")
    public ModelAndView add(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("personnel/yjgl/add");
        return mv;
    }
    @RequestMapping(value = "edit")
    public ModelAndView edit(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("personnel/yjgl/edit");
        return mv;
    }
    @RequestMapping(value = "info")
    public ModelAndView info(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("personnel/yjgl/info");
        return mv;
    }
}
