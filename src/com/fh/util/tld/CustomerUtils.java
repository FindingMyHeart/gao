package com.fh.util.tld;

import com.fh.service.customer.CustomerService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.List;

/**
 * Created by Administrator on 2017/1/12.
 */
public class CustomerUtils {

    private static CustomerService customerService = SpringContextHolder.getBean(CustomerService.class);

    //获取建档人列表  (所有)
    public static List<PageData> getAllJdrList(){
        PageData pd = new PageData();
        List<PageData> users = customerService.getAllJdrList(pd);
        return users;
    }
}
