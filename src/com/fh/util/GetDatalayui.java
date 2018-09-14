package com.fh.util;

import com.fh.entity.Page;
import com.fh.entity.layui.LayuiResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.shiro.SecurityUtils;

import javax.xml.crypto.Data;
import java.util.List;

/**
 * Created by caozengling on 2017/9/7.
 */
public class GetDatalayui {
    protected static Logger logger = LoggerFactory.getLogger(GetDatalayui.class);
    public static void getPData(Page page, PageData pd) {
        //分页暂时设置状态
        page.setRows(Integer.parseInt(pd.get("limit").toString()));
        page.setPage(Integer.parseInt(pd.get("page").toString()));
        page.setPd(pd);
    }

    public static void getLData(LayuiResult layuiResult, Page page, List<PageData> varList) {

        layuiResult.setCode(0);
        layuiResult.setCount(page.getTotal());
        //返回layui table接收的json数据
        if (varList != null && varList.size() > 0) {
            for (int i = 0; i < varList.size(); i++) {
                varList.get(i).put("ROWNUM", (page.getPage() - 1) * 10 + i + 1);
            }
        }
        layuiResult.setData(varList);
    }
}
