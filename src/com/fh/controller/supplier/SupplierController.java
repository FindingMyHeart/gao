package com.fh.controller.supplier;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/1.
 */
@Controller
@RequestMapping(value = "supplier")
public class SupplierController extends BaseController{

    /********************************************************************************************************************
     *  供应商管理
     *      1、供应商信息录入  12.1
     *      2、供应商信息查询  12.2
     ********************************************************************************************************************/

    /**
     *  1、供应商信息录入  12.1
     * @return
     */
    @RequestMapping(value = "entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("supplier/base/entry");
        return mv;
    }

    /**
     *  2、供应商信息查询  12.2
     * @return
     */
    @RequestMapping(value = "list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("supplier/base/list");
        return mv;
    }

}
