package com.fh.controller.xtgl;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 角色管理
 */
@Controller
@RequestMapping("role")
public class RoleController extends BaseController {


    /**
     *  新增
     */
    @RequestMapping(value = "entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("xtgl/role/entry");
        return mv;
    }


    /**
     * 列表
     */
    @RequestMapping(value = "list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("xtgl/role/list");
        return mv;
    }

}
