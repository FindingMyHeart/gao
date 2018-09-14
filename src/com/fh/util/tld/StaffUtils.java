package com.fh.util.tld;

import com.fh.service.customer.CustomerService;
import com.fh.service.xtgl.StaffService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/1/12.
 */
public class StaffUtils {

    private static StaffService staffService = SpringContextHolder.getBean(StaffService.class);

    //获取所有用户列表
    public static List<PageData> getAllStaffList(){
        PageData pd = new PageData();
        List<PageData> users = new ArrayList<PageData>();
        try {
            pd.put("S_TYPE","select");
            users = staffService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return users;
    }
}
