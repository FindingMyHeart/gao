package com.fh.controller.project;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/6/8.
 */
@RequestMapping(value="buy")
@Controller
public class BuyController extends BaseController{

    /********************************************************************************************************************
     * 采购管理
     *     物料采购
     *         5.1.1 采购订单录入
     *         5.1.2 采购订单查询
     *         5.1.3 采购物料查询
     *         5.1.4 采购审批
     *         5.1.5 采购退货
     *         5.1.6 采购合同管理
     *         5.1.7 采购查询
     *     其他采购
     *         5.2.1 采购申请
     *         5.2.2 采购申请查询
     *         5.2.3 采购申请审批
     ********************************************************************************************************************/

    //5.1.1 采购订单录入
    @RequestMapping(value="/materialBuy/entry")
    public ModelAndView omaterialBuy_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_entry");
        return mv;
    }

    //5.1.2 采购订单查询
    @RequestMapping(value="/materialBuy/order_list")
    public ModelAndView omaterialBuy_order_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_order_list");
        return mv;
    }

    //5.1.3 采购物料查询
    @RequestMapping(value="/materialBuy/material_list")
    public ModelAndView omaterialBuy_material_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_material_list");
        return mv;
    }

    //5.1.4 采购审批
    @RequestMapping(value="/materialBuy/examine")
    public ModelAndView omaterialBuy_examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_examine");
        return mv;
    }

    //5.1.5 采购退货（录入）
    @RequestMapping(value="/materialBuy/return_entry")
    public ModelAndView omaterialBuy_return_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_return_entry");
        return mv;
    }

    //5.1.5 采购退货（订单查询）
    @RequestMapping(value="/materialBuy/return_order_list")
    public ModelAndView omaterialBuy_return_order_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_return_order_list");
        return mv;
    }

    //5.1.5 采购退货（物料查询）
    @RequestMapping(value="/materialBuy/return_material_list")
    public ModelAndView omaterialBuy_return_material_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_return_material_list");
        return mv;
    }

    //5.1.6 采购合同管理（录入）
    @RequestMapping(value="/materialBuy/contract_entry")
    public ModelAndView omaterialBuy_contract_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_contract_entry");
        return mv;
    }

    //5.1.6 采购合同管理（查询）
    @RequestMapping(value="/materialBuy/contract_list")
    public ModelAndView omaterialBuy_contract_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_contract_list");
        return mv;
    }

    //5.1.6 5.1.7 采购查询
    @RequestMapping(value="/materialBuy/list")
    public ModelAndView omaterialBuy_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/material_buy_list");
        return mv;
    }


    //5.2.1 采购申请
    @RequestMapping(value="/otherBuy/entry")
    public ModelAndView otherBuy_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/other_buy_entry");
        return mv;
    }

    //5.2.2 采购申请查询
    @RequestMapping(value="/otherBuy/list")
    public ModelAndView otherBuy_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/other_buy_list");
        return mv;
    }

    //5.2.3 采购申请审批
    @RequestMapping(value="/otherBuy/examine")
    public ModelAndView otherBuy_examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("project/buy/other_buy_examine");
        return mv;
    }
}
