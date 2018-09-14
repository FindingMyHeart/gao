package com.fh.service.buy;

import com.fh.entity.Page;
import com.fh.service.buy.busbuydetail.BusBuyDetailService;
import com.fh.service.buy.busbuyinfo.BusBuyInfoService;
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

import java.util.List;

/**
 * Created by 11029 on 2018/6/6.
 */
@Service("buyService")
public class BuyService {
    @Autowired
    private BusBuyInfoService busBuyInfoService;//引用主表信息

    @Autowired
    private BusBuyDetailService busBuyDetailService;//引入子表信息
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
        String buy_sn = busBuyInfoService.getBuySn();
        String BUY_ID = UuidUtil.get32UUID(); 
        pd.put("BUY_ID",BUY_ID);//放入主键ID
        pd.put("BUY_SN", buy_sn);
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        pd.put("STATUS","1");//新建
        busBuyInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("BUY_DETAIL_ID",UuidUtil.get32UUID()); 
            params.put("BUY_ID",BUY_ID);
            params.put("SUPPLIER_ID",jo.get("SUPPLIER_ID"));//供应商ID
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));//产品id
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));//系统名称
            params.put("SUB_NO",jo.get("SUB_NO"));//顺序号
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));//产品数量
            params.put("BUY_NUM",jo.get("BUY_NUM"));//已购数量
            params.put("STORE_NUM",jo.get("STORE_NUM"));//库存数量
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));//单价
            params.put("TOTAL_PRICE",jo.get("TOTAL_PRICE"));//总价
            params.put("MEMO",jo.get("MEMO"));//产品数量
            params.put("APPLYBUY_DETAIL_ID",jo.get("APPLYBUY_DETAIL_ID"));//关联申购信息
            busBuyDetailService.save(params);
        }
        result.put("BUY_SN",buy_sn);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"BUY_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        busBuyInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String BUY_ID = "";
        if(pd.get("BUY_ID") == null || pd.getString("BUY_ID") == null || pd.getString("BUY_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        BUY_ID = pd.getString("BUY_ID");
//        busBuyInfoService.edit(pd);
        PageData params = new PageData();
        params.put("BUY_ID",BUY_ID);
        busBuyDetailService.deleteByBuyId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("BUY_DETAIL_ID",UuidUtil.get32UUID());
            params.put("BUY_ID",BUY_ID);
            params.put("SUPPLIER_ID",jo.get("SUPPLIER_ID"));//供应商ID
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));//产品id
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));//系统名称
            params.put("SUB_NO",jo.get("SUB_NO"));//顺序号
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));//产品数量
            params.put("BUY_NUM",jo.get("BUY_NUM"));//已购数量
            params.put("STORE_NUM",jo.get("STORE_NUM"));//库存数量
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));//单价
            params.put("TOTAL_PRICE",jo.get("TOTAL_PRICE"));//总价
            params.put("MEMO",jo.get("MEMO"));//产品数量
            params.put("APPLYBUY_DETAIL_ID",jo.get("APPLYBUY_DETAIL_ID"));//关联申购信息
            busBuyDetailService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = busBuyInfoService.findById(pd);
        if(result == null || result.get("BUY_ID") == null || result.getString("BUY_ID") == null || result.getString("BUY_ID").equals("")){
            return result;
        }
        String BUY_ID = result.getString("BUY_ID");
        PageData params = new PageData();
        params.put("BUY_ID",BUY_ID);
        List<PageData> itemList = busBuyDetailService.listAll(params);
        result.put("itemList",itemList);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return busBuyInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return busBuyInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"BUY_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("BUY_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        busBuyInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     * 8、物料采购
     */
    public List<PageData> materialList(Page page) throws Exception {
        return busBuyDetailService.materiallistPage(page);
    }

    /**
     * 9、修改状态
     */

    public void updateStatus(PageData pd) throws Exception {
        busBuyInfoService.updateStatus(pd);
    }
}
