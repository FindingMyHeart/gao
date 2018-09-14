package com.fh.controller.invoice;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/1.
 */
@Controller
@RequestMapping(value = "invoice")
public class InvoiceController extends BaseController{

    /********************************************************************************************************************
     *  开票信息管理
     *      1、开票信息信息录入  13.1
     *      2、开票信息信息查询  13.2
     ********************************************************************************************************************/

    /**
     *  1、开票信息信息录入  13.1
     * @return
     */
    @RequestMapping(value = "entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("invoice/base/entry");
        return mv;
    }

    /**
     *  2、开票信息信息查询  13.2
     * @return
     */
    @RequestMapping(value = "list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("invoice/base/list");
        return mv;
    }
}
