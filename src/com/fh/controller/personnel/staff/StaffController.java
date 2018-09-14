package com.fh.controller.personnel.staff;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/4/30.
 */
@Controller
@RequestMapping(value = "staff")
public class StaffController extends BaseController{

    /********************************************************************************************************************
     * 1.职员管理相关页面
     *      1.1、入职录入
     *      1.2、职员信息查询
     * 2.人事合同管理
     *      2.1、人事合同录入
     *      2.2、人事合同查询
     * 3.人事变动
     *      3.1、转正申请
     *      3.2、离职申请
     *      3.3、工作交接
     *      3.4、人事申请查询
     *      3.5、人事审批
     * 4.考勤管理
     *      4.1、加班确认
     *      4.2、调休申请
     *      4.3、请假申请
     *      4.4、考勤查询
     *      4.5、考勤申请
     ********************************************************************************************************************/
    //1.1、入职录入
    @RequestMapping(value = "entry")
    public ModelAndView entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/staff/entry");
        return mv;
    }

    //1.2、职员信息查询
    @RequestMapping(value = "list")
    public ModelAndView information_inquiry_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/staff/list");
        return mv;
    }

    //2.1、人事合同录入
    @RequestMapping(value = "contract/entry")
    public ModelAndView contract_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/contract/entry");
        return mv;
    }
    //2.2、人事合同查询
    @RequestMapping(value = "contract/list")
    public ModelAndView contract_list(){
        ModelAndView mv = this.getModelAndView();
        mv.setViewName("personnel/contract/list");
        return mv;
    }

    //3.1、人事变动录入
    @RequestMapping(value = "transfer/entry")
    public ModelAndView transfer_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/transfer/entry");
        return mv;
    }
    //3.2、人事变动查询
    @RequestMapping(value = "transfer/list")
    public ModelAndView transfer_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/transfer/list");
        return mv;
    }

    //3.3、人事变动审核
    @RequestMapping(value = "transfer/examine")
    public ModelAndView examine_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/transfer/examine");
        return mv;
    }

    //4.1、新增一条考勤
    @RequestMapping(value = "attence/entry")
    public ModelAndView attence_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/attence/entry");
        return mv;
    }
    //3.2、人事变动查询
    @RequestMapping(value = "attence/list")
    public ModelAndView attence_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/attence/list");
        return mv;
    }

    //3.3、人事变动审核
    @RequestMapping(value = "attence/examine")
    public ModelAndView attence_examine_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("personnel/attence/examine");
        return mv;
    }
}
