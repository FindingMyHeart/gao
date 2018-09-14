package com.fh.util.tld;

import com.fh.service.supplier.SupplierService;
import com.fh.service.xtgl.DeptService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/5/6.
 */
public class DeptUtils {

    private static DeptService deptService  = SpringContextHolder.getBean(DeptService.class);


    //获取部门列表 (所有)
    public static List<PageData> getAllBmList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = deptService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
