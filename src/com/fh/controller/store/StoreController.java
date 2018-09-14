package com.fh.controller.store;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 11029 on 2018/5/19.
 */
@RequestMapping(value = "store")
@Controller
public class StoreController extends BaseController{

    /**********************************************************************************************************************
     * 一、入库 7.1.1
     * 二、出库 7.2.1
     * 三、退库 7.3.1
     * 四、特殊入库 7.4.1
     * 五、特殊出库 7.5.1
     * 六、报废管理 7.6.1
     * 七、订单查询
     * 八、订单统计
     * 九、仓储查询
     * 十、仓储统计
     *十一、库位管理
     *
     ***********************************************************************************************************************/
    /**
     *  一、入库 7.1.1
     * @return
     */
    @RequestMapping(value = "rk")
    public ModelAndView  rk(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        pd.put("type","1");
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/entry");
        return mv;
    }
    /**
     *  二、出库 7.2.1
     * @return
     */
    @RequestMapping(value = "ck")
    public ModelAndView  ck(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        pd.put("type","2");
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/entry");
        return mv;
    }
    /**
     *  三、退库 7.3.1
     * @return
     */
    @RequestMapping(value = "tk")
    public ModelAndView  tk(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        pd.put("type","3");
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/entry");
        return mv;
    }
    /**
     *  四、特殊入库 7.4.1
     * @return
     */
    @RequestMapping(value = "tsrk")
    public ModelAndView  tsrk(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        pd.put("type","4");
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/entry");
        return mv;
    }
    /**
     *  五、特殊出库 7.5.1
     * @return
     */
    @RequestMapping(value = "tsck")
    public ModelAndView  tsck(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        pd.put("type","5");
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/entry");
        return mv;
    }
    /**
     *  六、报废管理 7.6.1
     * @return
     */
    @RequestMapping(value = "bfgl")
    public ModelAndView  bfgl(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        pd.put("type","6");
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/entry");
        return mv;
    }

    /**
     *  七、订单查询 7.1.1
     * @return
     */
    @RequestMapping(value = "ddcx")
    public ModelAndView  ddcx(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("store/ddcx/list");
        return mv;
    }

    /**
     *  九、仓储管理
     * @return
     */
    @RequestMapping(value = "ccgl")
    public ModelAndView  ccgl(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("store/ccgl/list");
        return mv;
    }

    /**
     *  十一、库位管理
     *
     * @return
     */
    //1、库位列表
    @RequestMapping(value = "kwgl/list")
    public ModelAndView  kwgl_list(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("store/kwgl/list");
        return mv;
    }
    //2、新增库位
    @RequestMapping(value = "kwgl/entry")
    public ModelAndView  kwgl_entry(){
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        mv.addObject("pd",pd);
        mv.setViewName("store/kwgl/entry");
        return mv;
    }


}
