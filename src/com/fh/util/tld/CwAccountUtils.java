package com.fh.util.tld;

import java.util.ArrayList;
import java.util.List;

import com.fh.service.cw.CwAccountService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

/**
 * Created by 11029 on 2018/5/6.
 */
public class CwAccountUtils {

    private static CwAccountService cwAccountService  = SpringContextHolder.getBean(CwAccountService.class);


    //获取部门列表 (所有)
    public static List<PageData> getAllAccountList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = cwAccountService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }


    //获取所有的开户行列表
    public static List<PageData> getAllKhhList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = cwAccountService.listAllKhh(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

}
