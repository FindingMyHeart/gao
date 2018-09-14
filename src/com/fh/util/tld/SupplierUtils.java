package com.fh.util.tld;

import com.fh.service.customer.CustomerService;
import com.fh.service.supplier.SupplierService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/5/6.
 */
public class SupplierUtils {

    private static SupplierService supplierService = SpringContextHolder.getBean(SupplierService.class);

    //获取供应商 (所有)
    public static List<PageData> getAllGysList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = supplierService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
    //获取供应商性质  (所有)
    public static List<PageData> getAllGysXzList(){
        PageData pd = new PageData();
        List<PageData> list = supplierService.getAllGysXzList(pd);
        return list;
    }
}
