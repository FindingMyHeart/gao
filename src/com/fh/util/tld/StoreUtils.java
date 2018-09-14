package com.fh.util.tld;

import com.fh.service.material.MaterialService;
import com.fh.service.store.storelocationinfo.StoreLocationInfoService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/5/21.
 */
public class StoreUtils {
    //引入物料信息service
    private static StoreLocationInfoService storeLocationInfoService = SpringContextHolder.getBean(StoreLocationInfoService.class);

    /**
     * 获取获取库存变动名称
     */
    public static String getIoNameById(String id){
        String result = "";
        if(id.equals("1")){
            result = "入库";
        } else if (id.equals("2")){
            result = "出库";
        } else if (id.equals("3")){
            result = "退库";
        } else if (id.equals("4")){
            result = "特殊入库";
        } else if (id.equals("5")){
            result = "特殊出库";
        } else if (id.equals("6")){
            result = "报废";
        }
        return result;
    }

    /**
     * 获取所有的库位列表
     */
    public static List<PageData> getAllKwList(){
        List<PageData> list = new ArrayList<PageData>();
        PageData pd = new PageData();
        try {
            list = storeLocationInfoService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
