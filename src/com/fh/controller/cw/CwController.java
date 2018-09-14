package com.fh.controller.cw;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/7/15.
 */
@Controller
@RequestMapping(value = "cw")
public class CwController extends BaseController{


    /**********************************************************************************************************************
     *  财务管理
     *      一、费用管理
     *          1.2 其他收入
     *              1.2.1 新增
     *              1.2.2 列表
     *          1.3 银行存取款
     *              1.3.1 新增
     *              1.3.2 列表
     *      二、往来管理
     *         1、应收款单
     *         2、应付款单
     *      三、银行账户管理
     *         3.1 新增
     *         3.2 列表
     *      四、费用管理
     *         4.1 新增
     *         4.2 列表
     *         4.3 审核
     *      五、发票管理
     *         5.1 登记管理
     *             5.1.1  新增
     *             5.1.2  列表
     *         5.2 申请管理
     *             5.2.1  新增
     *             5.2.2  列表
     *             5.2.3  审批
     *      六、收据管理
     *         6.1 新增
     *         6.2 列表
     *         6.3 审核
     ***********************************************************************************************************************/

    //1.1.1 费用支出新增
    @RequestMapping("feePay/entry")
    public ModelAndView feePay_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/feePay/entry");
        return mv;
    }

    //1.1.2 费用支出列表
    @RequestMapping("feePay/list")
    public ModelAndView feePay_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/feePay/list");
        return mv;
    }

    //1.1.3 费用支出审核
    @RequestMapping("feePay/examine")
    public ModelAndView feePay_examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/feePay/examine");
        return mv;
    }


    //1.2.1 其他收入新增
    @RequestMapping("otherIncome/entry")
    public ModelAndView otherIncome_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.addObject("id",pd.getString("id"));
        mv.setViewName("cw/otherIncome/entry");
        return mv;
    }

    //1.2.2 其他收入列表
    @RequestMapping("otherIncome/list")
    public ModelAndView otherIncome_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/otherIncome/list");
        return mv;
    }

    //1.3.1 银行存取款新增
    @RequestMapping("accessMoney/entry")
    public ModelAndView accessMoney_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.addObject("id",pd.getString("id"));
        mv.setViewName("cw/accessMoney/entry");
        return mv;
    }

    //1.3.2 银行存取款列表
    @RequestMapping("accessMoney/list")
    public ModelAndView accessMoney_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/accessMoney/list");
        return mv;
    }

    //2.1.1 应付款单新增
    @RequestMapping("shouldReceive/entry")
    public ModelAndView shouldReceive_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/shouldReceive/entry");
        return mv;
    }

    //2.1.2 应付款单列表
    @RequestMapping("shouldReceive/list")
    public ModelAndView shouldReceive_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/shouldReceive/list");
        return mv;
    }

    //2.2.2 应付款单列表
    @RequestMapping("shouldPay/list")
    public ModelAndView shouldPay_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/shouldPay/list");
        return mv;
    }



    //3.1 银行账户新增
    @RequestMapping("account/entry")
    public ModelAndView account_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.addObject("id",pd.getString("id"));
        mv.setViewName("cw/account/entry");
        return mv;
    }

    //3.2 银行账户列表
    @RequestMapping("account/list")
    public ModelAndView account_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/account/list");
        return mv;
    }


    //4.1 费用申请
    @RequestMapping("feeApply/entry")
    public ModelAndView feeApply_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.addObject("id",pd.getString("id"));
        mv.setViewName("cw/feeApply/entry");
        return mv;
    }

    //4.2 费用申请查询
    @RequestMapping("feeApply/list")
    public ModelAndView feeApply_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/feeApply/list");
        return mv;
    }

    //4.3 费用申请查询
    @RequestMapping("feeApply/examine")
    public ModelAndView feeApply_examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/feeApply/examine");
        return mv;
    }


    //5.1.1  新增
    @RequestMapping("invoiceInfo/entry")
    public ModelAndView invoiceInfo_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/invoiceInfo/entry");
        return mv;
    }

    //5.1.2  列表
    @RequestMapping("invoiceInfo/list")
    public ModelAndView invoiceInfo_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/invoiceInfo/list");
        return mv;
    }


    //5.2.1  新增
    @RequestMapping("invoiceApply/entry")
    public ModelAndView invoiceApply_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/invoiceApply/entry");
        return mv;
    }

    //5.2.2  列表
    @RequestMapping("invoiceApply/list")
    public ModelAndView invoiceApply_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/invoiceApply/list");
        return mv;
    }

    //5.2.3  审核
    @RequestMapping("invoiceApply/examine")
    public ModelAndView invoiceApply_examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/invoiceApply/examine");
        return mv;
    }



    //6.1 新增收据
    @RequestMapping("receipt/entry")
    public ModelAndView receipt_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.addObject("id",pd.getString("id"));
        mv.setViewName("cw/receipt/entry");
        return mv;
    }

    //6.2 收据列表
    @RequestMapping("receipt/list")
    public ModelAndView receipt_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/receipt/list");
        return mv;
    }

    //6.3 收据审核
    @RequestMapping("receipt/examine")
    public ModelAndView receipt_examine(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("cw/receipt/examine");
        return mv;
    }





}



