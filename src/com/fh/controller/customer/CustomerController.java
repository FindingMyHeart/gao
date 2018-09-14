package com.fh.controller.customer;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/4/30.
 */
@Controller
@RequestMapping(value = "customer")
public class CustomerController extends BaseController{

    /********************************************************************************************************************
     *  客户管理
     *      1、客户信息录入  11.1
     *      2、客户信息查询  11.2
     ********************************************************************************************************************/

    /**
     *  1、客户信息录入  11.1
     * @return
     */
    @RequestMapping(value = "entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("customer/base/entry");
        return mv;
    }

    /**
     *  2、客户信息查询  11.2
     * @return
     */
    @RequestMapping(value = "list")
    public ModelAndView list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("customer/base/list");
        return mv;
    }

    /***
     *
     *
     *    SERVICE_ID
     *    SERVICE_KEY
     *    SERVICE_METHOD
     *    SERVICE_CLASS
     *    SERVICE_INPARA
     *    SERVICE_OUTPARA
     *    MODULE_NAME
     *    FUNC_NAME
     *    AUTH_CODE
     *    IF_DELETED
     *    CREATE_TIME
     *
     *
     *
     */

}
