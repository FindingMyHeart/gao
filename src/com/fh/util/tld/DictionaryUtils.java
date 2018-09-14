package com.fh.util.tld;

import com.fh.service.customer.CustomerService;
import com.fh.service.xtgl.DicService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/5/21.
 */
public class DictionaryUtils {

    private static DicService dicService = SpringContextHolder.getBean(DicService.class);

    /**
     *   根据父类型获取字典信息
     * @param dic_type
     * @return
     */
    public static List<PageData> getDicListByType(String dic_type){
        List<PageData> list = new ArrayList<PageData>();
        PageData pd = new PageData();
        pd.put("DIC_TYPE",dic_type);
        try {
            list = dicService.listByType(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

}
