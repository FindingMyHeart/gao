package com.fh.util.tld;

import com.fh.service.material.MaterialCategoryService;
import com.fh.service.material.MaterialService;
import com.fh.service.supplier.SupplierService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/5/13.
 */
public class MaterialUils {
    //引入物料信息service
    private static MaterialService materialService = SpringContextHolder.getBean(MaterialService.class);
    //引入物料分类service
    private static MaterialCategoryService materialCategoryService = SpringContextHolder.getBean(MaterialCategoryService.class);

    //获取物料分类列表  (树形)
    public static List<PageData> getMaterialCategoryForSelectTree(){
        PageData pd = new PageData();
        List<PageData> list = materialCategoryService.getForSelectTree(pd);
        return list;
    }

    //获取物料信息（品牌）列表
    public static List<PageData> getAllMaterialList(){
        PageData pd = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = materialService.listAll(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
