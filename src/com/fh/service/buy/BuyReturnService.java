package com.fh.service.buy;

import com.fh.entity.Page;
import com.fh.service.buy.busbuyreturndetail.BusBuyReturnDetailService;
import com.fh.service.buy.busbuyreturninfo.BusBuyReturnInfoService;
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
 * Created by 11029 on 2018/6/6.
 */
@Service("buyReturnService")
public class BuyReturnService {
    @Autowired
    private BusBuyReturnInfoService busBuyReturnInfoService;//引用主表信息

    @Autowired
    private BusBuyReturnDetailService buyReturnDetailService;//引入子表信息
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
        String RETURN_SN = busBuyReturnInfoService.getReturnSn();
        String RETURN_ID = UuidUtil.get32UUID(); 
        pd.put("RETURN_ID",RETURN_ID);//放入主键ID
        pd.put("RETURN_SN", RETURN_SN);
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        busBuyReturnInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("DETAIL_ID",UuidUtil.get32UUID()); 
            params.put("RETURN_ID",RETURN_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));//顺序号
            params.put("PROJECT_ID",jo.get("PROJECT_ID"));//项目id
            params.put("SUPPLIER_ID",jo.get("SUPPLIER_ID"));//供应商id
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));//产品id
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));//产品数量
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));//产品单价
            params.put("TOTAL_PRICE",jo.get("TOTAL_PRICE"));//产品总价
            params.put("MEMO",jo.get("MEMO"));//产品数量
            buyReturnDetailService.save(params);
        }
        result.put("RETURN_SN",RETURN_SN);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"RETURN_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        busBuyReturnInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String RETURN_ID = "";
        if(pd.get("RETURN_ID") == null || pd.getString("RETURN_ID") == null || pd.getString("RETURN_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        RETURN_ID = pd.getString("RETURN_ID");
        //主表没有什么要修改的，就不作修改了
//        busBuyReturnInfoService.edit(pd);
        PageData params = new PageData();
        params.put("RETURN_ID",RETURN_ID);
        buyReturnDetailService.deleteByReturnyId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("DETAIL_ID",UuidUtil.get32UUID());
            params.put("RETURN_ID",RETURN_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));//顺序号
            params.put("PROJECT_ID",jo.get("PROJECT_ID"));//项目id
            params.put("SUPPLIER_ID",jo.get("SUPPLIER_ID"));//供应商id
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));//产品id
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));//产品数量
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));//产品单价
            params.put("TOTAL_PRICE",jo.get("TOTAL_PRICE"));//产品总价
            params.put("MEMO",jo.get("MEMO"));//产品数量
            buyReturnDetailService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = busBuyReturnInfoService.findById(pd);
        if(result == null || result.get("RETURN_ID") == null || result.getString("RETURN_ID") == null || result.getString("RETURN_ID").equals("")){
            return result;
        }
        String RETURN_ID = result.getString("RETURN_ID");
        PageData params = new PageData();
        params.put("RETURN_ID",RETURN_ID);
        List<PageData> itemList = buyReturnDetailService.listAll(params);
        result.put("itemList",itemList);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return busBuyReturnInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return busBuyReturnInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"RETURN_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("RETURN_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        busBuyReturnInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     * 8、物料列表
     */
    public List<PageData> materialList(Page page) throws Exception {
        List<PageData> list = new ArrayList<PageData>();
        list = buyReturnDetailService.materiallistPage(page);
        return list;
    }
}
