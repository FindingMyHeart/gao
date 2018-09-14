package com.fh.service.ohterBuy;

import com.fh.entity.Page;
import com.fh.service.ohterBuy.busotherbuydetail.BusOtherBuyDetailService;
import com.fh.service.ohterBuy.busotherbuyinfo.BusOtherBuyInfoService;
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
@Service("otherBuyService")
public class OtherBuyService {

    @Autowired
    private BusOtherBuyInfoService busOtherBuyInfoService;//引用主表信息

    @Autowired
    private BusOtherBuyDetailService busOtherBuyDetailService;//引入子表信息
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

        String buy_sn = busOtherBuyInfoService.getBuySn();

        String OTHER_BUY_ID = UuidUtil.get32UUID(); 
        pd.put("OTHER_BUY_ID",OTHER_BUY_ID);//放入主键ID
        pd.put("BUY_SN",buy_sn);//编号
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        pd.put("STATUS","1");//新建
        busOtherBuyInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i); 
            params = new PageData();
            params.put("OTHER_BUY_DETAIL_ID",UuidUtil.get32UUID()); 
            params.put("OTHER_BUY_ID",OTHER_BUY_ID);
            params.put("SUB_NO",jo.get("CONTACT_TEL"));//顺序号
            params.put("NAME",jo.get("NAME"));//名称
            params.put("BRAND",jo.get("BRAND"));//品牌
            params.put("SPEC",jo.get("SPEC"));//规格
            params.put("UNIT",jo.get("UNIT"));//单位
            params.put("NUM",jo.get("NUM"));//数量
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));//单价
            params.put("TOTAL_PRICE",jo.get("TOTAL_PRICE"));//总价
            params.put("MEMO",jo.get("MEMO"));//产品数量
            busOtherBuyDetailService.save(params);
        }
        result.put("buy_sn",buy_sn);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"OTHER_BUY_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        busOtherBuyInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String OTHER_BUY_ID = "";
        if(pd.get("OTHER_BUY_ID") == null || pd.getString("OTHER_BUY_ID") == null || pd.getString("OTHER_BUY_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        OTHER_BUY_ID = pd.getString("OTHER_BUY_ID");
        busOtherBuyInfoService.edit(pd);
        PageData params = new PageData();
        params.put("OTHER_BUY_ID",OTHER_BUY_ID);
        busOtherBuyDetailService.deleteByOtherBuyId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("OTHER_BUY_DETAIL_ID",UuidUtil.get32UUID());
            params.put("OTHER_BUY_ID",OTHER_BUY_ID);
            params.put("SUB_NO",jo.get("CONTACT_TEL"));//顺序号
            params.put("NAME",jo.get("NAME"));//名称
            params.put("BRAND",jo.get("BRAND"));//品牌
            params.put("SPEC",jo.get("SPEC"));//规格
            params.put("UNIT",jo.get("UNIT"));//单位
            params.put("NUM",jo.get("NUM"));//数量
            params.put("UNIT_PRICE",jo.get("UNIT_PRICE"));//单价
            params.put("TOTAL_PRICE",jo.get("TOTAL_PRICE"));//总价
            params.put("MEMO",jo.get("MEMO"));//产品数量
            busOtherBuyDetailService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = busOtherBuyInfoService.findById(pd);
        if(result == null || result.get("OTHER_BUY_ID") == null || result.getString("OTHER_BUY_ID") == null || result.getString("OTHER_BUY_ID").equals("")){
            return result;
        }
        String OTHER_BUY_ID = result.getString("OTHER_BUY_ID");
        PageData params = new PageData();
        params.put("OTHER_BUY_ID",OTHER_BUY_ID);
        List<PageData> itemList = busOtherBuyDetailService.listAll(params);
        result.put("itemList",itemList);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        PageData pd = page.getPd();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("STAFF_ID",staff.getSTAFF_ID());
        page.setPd(pd);
        return busOtherBuyInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return busOtherBuyInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"OTHER_BUY_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("OTHER_BUY_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        busOtherBuyInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     *  8、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        busOtherBuyInfoService.updateStatus(pd);
    }
}
