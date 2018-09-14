package com.fh.controller.app;

import com.fh.controller.base.BaseController;
import com.fh.service.exportExcel.ExportExcelService;
import com.fh.util.PageData;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/8/25.
 */
@Controller
@RequestMapping(value="common")
public class CommonController extends BaseController{

    @Autowired
    private ExportExcelService exportExcelService;


    @RequestMapping(value = "/exportExcel")
    public void exportExcel(HttpServletResponse response, HttpServletRequest request) throws Exception {
        logBefore(logger, "导出Pictures到excel");
        PageData params = new PageData();
        List<String> titleStringList = new ArrayList<String>();
        List<String> titleColumnList = new ArrayList<String>();
        List<PageData> dataList = new ArrayList<PageData>();

        params = this.getPageData();

        if (params.getString("title") == null || params.getString("title").equals("")) {
            throw new Exception("没有设置要导出EXCEL的标题");
        }

        if (params.getString("titleList") == null || params.getString("titleList").equals("")) {
            throw new Exception("没有设置要导出EXCEL的标题行数据");
        }

        if (params.getString("data") == null || params.getString("data").equals("")) {
            throw new Exception("没有设置要导出EXCEL的数据");
        }

        String title = params.getString("title");
        String titleList = params.getString("titleList");
        String data = params.getString("data");

        JSONArray titleArray = JSONArray.fromObject(titleList);

        JSONArray dataArray = JSONArray.fromObject(data);


        for (int i = 0; i < titleArray.size(); i++) {
            JSONObject jo = (JSONObject) titleArray.get(i);
            titleStringList.add(jo.get("NAME").toString());
            titleColumnList.add(jo.get("VALUE").toString());
        }
        for (int i = 0; i < dataArray.size(); i++) {
            JSONObject jo = (JSONObject) dataArray.get(i);
            PageData temp = new PageData();
            for (int j = 0; j < titleColumnList.size(); j++) {
                String KEY = titleColumnList.get(j);
                String VALUE = "";
                if (jo.containsKey(KEY)) {
                    //如果是环比同比,保留两位小数 jintian 2018-03-09
                    if(KEY.indexOf("_2") !=-1 || KEY.indexOf("_3") !=-1){
                        DecimalFormat df = new DecimalFormat("0.00");
                        df.setRoundingMode(RoundingMode.HALF_UP);
                        VALUE =  String.valueOf(df.format(Double.parseDouble(jo.get(KEY).toString())));
//                        double f = Double.parseDouble(jo.get(KEY).toString());
//                        BigDecimal b = new BigDecimal(f);
//                        double f1 =  b.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
//                        VALUE = String.valueOf(f1);
                    }else{
                        VALUE = jo.get(KEY).toString();
                    }
                }
                temp.put(KEY, VALUE);
            }
            dataList.add(temp);
        }

        exportExcelService.exportExcel(title, titleStringList, titleColumnList, dataList, response,request);

    }
}
