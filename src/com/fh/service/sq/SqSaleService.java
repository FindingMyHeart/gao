package com.fh.service.sq;

import com.fh.entity.Page;
import com.fh.service.sq.base.SqSaleDetailService;
import com.fh.service.sq.base.SqSaleInfoService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/8/26.
 */
@Service("sqSaleService")
public class SqSaleService {

    @Autowired
    private SqSaleInfoService sqSaleInfoService;

    @Autowired
    private SqSaleDetailService sqSaleDetailService;


    /**
     * 1、新增
     */
    public PageData save(PageData pd) throws Exception {
        PageData result = new PageData();
        PageData params = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String SALE_ID = UuidUtil.get32UUID();
        String sale_no = sqSaleInfoService.getSaleNo();
        pd.put("SALE_ID",SALE_ID);//放入主键ID
        pd.put("SALE_NO", sale_no);
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        sqSaleInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("SALE_DETAIL_ID",UuidUtil.get32UUID());
            params.put("SALE_ID",SALE_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MATERIAL_NAME",jo.get("MATERIAL_NAME"));
            params.put("MATERIAL_SPEC",jo.get("MATERIAL_SPEC"));
            params.put("MATERIAL_UNIT",jo.get("MATERIAL_UNIT"));
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));
            params.put("GOOD_PRICE",jo.get("GOOD_PRICE"));
            params.put("TAX_RATE",jo.get("TAX_RATE"));
            params.put("TAXATION",jo.get("TAXATION"));
            sqSaleDetailService.save(params);
        }
        result.put("SALE_NO",sale_no);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"SALE_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        sqSaleInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String SALE_ID = "";
        if(pd.get("SALE_ID") == null || pd.getString("SALE_ID") == null || pd.getString("SALE_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        SALE_ID = pd.getString("SALE_ID");
        sqSaleInfoService.edit(pd);
        PageData params = new PageData();
        params.put("SALE_ID",SALE_ID);
        sqSaleDetailService.deleteBySaleId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("SALE_DETAIL_ID",UuidUtil.get32UUID());
            params.put("SALE_ID",SALE_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MATERIAL_NAME",jo.get("MATERIAL_NAME"));
            params.put("MATERIAL_SPEC",jo.get("MATERIAL_SPEC"));
            params.put("MATERIAL_UNIT",jo.get("MATERIAL_UNIT"));
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));
            params.put("GOOD_PRICE",jo.get("GOOD_PRICE"));
            params.put("TAX_RATE",jo.get("TAX_RATE"));
            params.put("TAXATION",jo.get("TAXATION"));
            sqSaleDetailService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = sqSaleInfoService.findById(pd);
        if(result == null || result.get("SALE_ID") == null || result.getString("SALE_ID") == null || result.getString("SALE_ID").equals("")){
            return result;
        }
        String SALE_ID = result.getString("SALE_ID");
        PageData params = new PageData();
        params.put("SALE_ID",SALE_ID);
        List<PageData> itemList = sqSaleDetailService.listAll(params);
        result.put("itemList",itemList);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        List<PageData>  list = new ArrayList<PageData>();
        list = sqSaleInfoService.list(page);
        return list;
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return sqSaleInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"SALE_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("SALE_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        sqSaleInfoService.deleteAll(ArrayDATA_IDS);
    }


}
