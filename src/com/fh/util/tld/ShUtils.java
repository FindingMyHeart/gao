package com.fh.util.tld;

import com.fh.service.afterSale.AfterSaleProjectService;
import com.fh.service.afterSale.shprojectcontact.ShProjectContactService;
import com.fh.service.afterSale.shprojectinfo.ShProjectInfoService;
import com.fh.service.afterSale.shrepairpersonnel.ShRepairPersonnelService;
import com.fh.service.xtgl.StaffService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/1/12.
 */
public class ShUtils {

    private static ShProjectInfoService shProjectInfoService = SpringContextHolder.getBean(ShProjectInfoService.class);

    private static ShRepairPersonnelService shRepairPersonnelService = SpringContextHolder.getBean(ShRepairPersonnelService.class);

    //获取所有售后的项目列表
    public static List<PageData> getAllShProjectList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = shProjectInfoService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    //获取所有维修人员的列表
    public static List<PageData> getAllShWxryList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = shRepairPersonnelService.listWxry(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
