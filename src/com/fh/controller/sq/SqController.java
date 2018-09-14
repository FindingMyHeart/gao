package com.fh.controller.sq;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/4/30.
 */
@Controller
@RequestMapping(value = "sq")
public class SqController extends BaseController{

    /********************************************************************************************************************
     *  售前
     *      一、销售管理
     *          1.1 销售录入
     *          1.2 销售查询
     ********************************************************************************************************************/

    /**
     *  1.1 销售录入
     * @return
     */
    @RequestMapping(value = "/sale/entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("sq/sale/entry");
        return mv;
    }

    /**
     *  1.2 销售查询
     * @return
     */
    @RequestMapping(value = "/sale/list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("sq/sale/list");
        return mv;
    }

}
