package com.fh.util.tld;

import com.fh.service.invoice.InvoiceService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/7/16.
 */
public class InvoiceUtils {

    private static InvoiceService invoiceService = SpringContextHolder.getBean(InvoiceService.class);

    //获取开票信息列表 (所有)
    public static List<PageData> getAllKpxxList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = invoiceService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }



}
