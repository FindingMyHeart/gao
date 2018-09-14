package com.fh.controller.administration;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 行政页面的controller
 * Created by 11029 on 2018/6/21.
 */
@Controller
@RequestMapping(value = "adm")
public class AdministrationController extends BaseController{

    /*********************************************************************************************************************
     * 行政管理
     *     一、资产管理
     *          1.1 资产录入
     *          1.2 资产查询
     *          1.3 资产统计
     *     二、合同管理
     *          2.1 合同录入
     *          2.2 合同查询
     *          2.3 合同借用审批
     *     三、资质管理
     *          3.1 资质录入
     *          3.2 资质查询
     *          3.3 资质借用审批
     *          3.4 资质借用统计
     *     四、文档管理
     *          4.1 文档上传
     *          4.2 文档查询
     ********************************************************************************************************************/

    //1.1 资产录入
    @RequestMapping("/asset/entry")
    public ModelAndView asset_entry(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/asset/entry");
        return mv;
    }

    //1.2 资产查询
    @RequestMapping("/asset/list")
    public ModelAndView asset_list(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/asset/list");
        return mv;
    }

    //1.3 资产统计
    @RequestMapping("/asset/statistics")
    public ModelAndView asset_statistics(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/asset/statistics");
        return mv;
    }

    //2.1 合同录入
    @RequestMapping("/contract/entry")
    public ModelAndView contract_entry(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/contract/entry");
        return mv;
    }

    //2.2 合同查询
    @RequestMapping("/contract/list")
    public ModelAndView contract_list(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/contract/list");
        return mv;
    }

    //2.3 合同借用审批
    @RequestMapping("/contract/lend_examine")
    public ModelAndView contract_lend_examine(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/contract/lend_examine");
        return mv;
    }

    //3.1 资质录入
    @RequestMapping("/cert/entry")
    public ModelAndView cert_entry(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/cert/entry");
        return mv;
    }

    //3.2 资质查询
    @RequestMapping("/cert/list")
    public ModelAndView cert_list(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/cert/list");
        return mv;
    }

    //3.3 资质借用审批
    @RequestMapping("/cert/lend_examine")
    public ModelAndView cert_lend_examine(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/cert/lend_examine");
        return mv;
    }

    //3.4 资质借用统计
    @RequestMapping("/cert/lend_statistics")
    public ModelAndView cert_lend_statistics(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/cert/lend_statistics");
        return mv;
    }


    //4.1 文档上传
    @RequestMapping("/document/entry")
    public ModelAndView document_entry(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/document/entry");
        return mv;
    }

    //4.2 文档查询
    @RequestMapping("/document/list")
    public ModelAndView document_list(){
        ModelAndView mv =this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("adm/document/list");
        return mv;
    }

}
