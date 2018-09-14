package com.fh.service.applybuy;

import com.fh.entity.Page;
import com.fh.service.applybuy.busapplybuydetail.BusApplybuyDetailService;
import com.fh.service.applybuy.busapplybuyinfo.BusApplybuyInfoService;
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
@Service("applyBuyService")
public class ApplyBuyService {
    @Autowired
    private BusApplybuyInfoService busApplybuyInfoService;//引用主表信息

    @Autowired
    private BusApplybuyDetailService busApplybuyDetailService;//引入子表信息

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
        String applybuy_sn = busApplybuyInfoService.getApplybuySn();
        String APPLYBUY_ID = UuidUtil.get32UUID();
        pd.put("APPLYBUY_ID",APPLYBUY_ID);//放入主键ID
        pd.put("APPLYBUY_SN",applybuy_sn);
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("DEPT_ID", staff.getDEPT_ID());
        pd.put("IF_DELETED", "0");
        pd.put("STATUS","1");//新建
        busApplybuyInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("APPLYBUY_DETAIL_ID",UuidUtil.get32UUID());
            params.put("APPLYBUY_ID",APPLYBUY_ID);
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));//产品id
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));//系统名称
            params.put("SUB_NO",jo.get("SUB_NO"));//顺序号
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));//产品数量
            params.put("MEMO",jo.get("MEMO"));//产品数量
            busApplybuyDetailService.save(params);
        }

        result.put("APPLYBUY_SN",applybuy_sn);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"APPLYBUY_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        busApplybuyInfoService.delete(pd);
        //TODO 删除子表
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String APPLYBUY_ID = "";
        if(pd.get("APPLYBUY_ID") == null || pd.getString("APPLYBUY_ID") == null || pd.getString("APPLYBUY_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        APPLYBUY_ID = pd.getString("APPLYBUY_ID");
        busApplybuyInfoService.edit(pd);
        PageData params = new PageData();
        params.put("APPLYBUY_ID",APPLYBUY_ID);
        busApplybuyDetailService.deleteByApplybuyId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("APPLYBUY_DETAIL_ID",UuidUtil.get32UUID());
            params.put("APPLYBUY_ID",APPLYBUY_ID);
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));//产品id
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));//系统名称
            params.put("SUB_NO",jo.get("SUB_NO"));//顺序号
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));//产品数量
            params.put("MEMO",jo.get("MEMO"));//产品数量
            busApplybuyDetailService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = busApplybuyInfoService.findById(pd);
        if(result == null || result.get("APPLYBUY_ID") == null || result.getString("APPLYBUY_ID") == null || result.getString("APPLYBUY_ID").equals("")){
            return result;
        }
        String APPLYBUY_ID = result.getString("APPLYBUY_ID");
        PageData params = new PageData();
        params.put("APPLYBUY_ID",APPLYBUY_ID);
        List<PageData> itemList = busApplybuyDetailService.listAll(params);
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
        return busApplybuyInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return busApplybuyInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"APPLYBUY_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("APPLYBUY_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        busApplybuyInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     * 8、细节列表
     */
    public List<PageData> listDetail(Page page) throws Exception {
        return busApplybuyDetailService.list(page);
    }

    /**
     * 9、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        busApplybuyInfoService.updateStatus(pd);
    }
}
