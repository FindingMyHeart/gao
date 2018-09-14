package com.fh.controller.material;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/12.
 */
@Controller
@RequestMapping(value = "material")
public class MaterialController extends BaseController{

    /********************************************************************************************************************
     *  开票信息管理
     *      1、去物料信息库管理页面 14.1
     *      2、去物料分类页面
     *      3、去物料信息新增页面
     ********************************************************************************************************************/

    /**
     *  1、去物料信息库管理页面 14.1
     * @return
     */
    @RequestMapping(value = "index")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("material/base/index");
        return mv;
    }

    /**
     * 2、去物料分类页面
     */
    @RequestMapping(value = "category_entry")
    public ModelAndView category_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("material/category/category_entry");
        return mv;
    }

    /**
     * 3、去物料分类页面
     */
    @RequestMapping(value = "material_entry")
    public ModelAndView material_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("material/material/material_entry");
        return mv;
    }

}
