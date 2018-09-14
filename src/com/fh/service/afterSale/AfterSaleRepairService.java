package com.fh.service.afterSale;

import com.fh.entity.Page;
import com.fh.service.afterSale.shrepairinfo.ShRepairInfoService;
import com.fh.service.afterSale.shrepairpersonnel.ShRepairPersonnelService;
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
 * Created by 11029 on 2018/5/30.
 */
@Service("afterSaleRepairService")
public class AfterSaleRepairService {

    @Autowired
    private ShRepairInfoService shRepairInfoService;

    @Autowired
    private ShRepairPersonnelService shRepairPersonnelService;

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
        String REPAIR_ID = UuidUtil.get32UUID();
        String repair_no = shRepairInfoService.getRepairNo();
        pd.put("REPAIR_ID",REPAIR_ID);//放入主键ID
        pd.put("BAOXIU_TIME", DateUtil.getTime());
        pd.put("CREATE_TIME", DateUtil.getTime());
//        pd.put("REPAIR_NO", repair_no);
        pd.put("REPAIR_STATUS", "1000024");//已报修
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0"); 
        shRepairInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("personnelList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("REPAIR_PERSONNEL_ID",UuidUtil.get32UUID());
            params.put("REPAIR_ID",REPAIR_ID);
            params.put("ORDER_NO",jo.get("ORDER_NO"));
            params.put("PERSONNEL_NAME",jo.get("PERSONNEL_NAME"));
            params.put("PERSONNEL_TEL",jo.get("PERSONNEL_TEL"));
            params.put("MEMO",jo.get("MEMO"));
            shRepairPersonnelService.save(params);
        }
//        result.put("REPAIR_NO",repair_no);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"REPAIR_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        shRepairInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String REPAIR_ID = "";
        if(pd.get("REPAIR_ID") == null || pd.getString("REPAIR_ID") == null || pd.getString("REPAIR_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        REPAIR_ID = pd.getString("REPAIR_ID");
        shRepairInfoService.edit(pd);
        PageData params = new PageData();
        params.put("REPAIR_ID",REPAIR_ID);
        shRepairPersonnelService.deleteByRepairId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("personnelList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("REPAIR_PERSONNEL_ID",UuidUtil.get32UUID());
            params.put("REPAIR_ID",REPAIR_ID);
            params.put("ORDER_NO",jo.get("ORDER_NO"));
            params.put("PERSONNEL_NAME",jo.get("PERSONNEL_NAME"));
            params.put("PERSONNEL_TEL",jo.get("PERSONNEL_TEL"));
            params.put("MEMO",jo.get("MEMO"));
            shRepairPersonnelService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = shRepairInfoService.findById(pd);
        if(result == null || result.get("REPAIR_ID") == null || result.getString("REPAIR_ID") == null || result.getString("REPAIR_ID").equals("")){
            return result;
        }
        String REPAIR_ID = result.getString("REPAIR_ID");
        PageData params = new PageData();
        params.put("REPAIR_ID",REPAIR_ID);
        List<PageData> personnelList = shRepairPersonnelService.listAll(params);
        result.put("personnelList",personnelList);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
//        PERSONNEL_NAMES
        List<PageData>  list = new ArrayList<PageData>();
        list = shRepairInfoService.list(page);
        for(PageData temp : list){
            if(temp != null && temp.get("REPAIR_ID") != null && temp.getString("REPAIR_ID") != null && !temp.getString("REPAIR_ID").equals("")){
                String repair_id = temp.getString("REPAIR_ID");
                String PERSONNEL_NAMES = shRepairPersonnelService.getPersonnelNames(repair_id);
                temp.put("PERSONNEL_NAMES",PERSONNEL_NAMES);
            }
        }
        return list;
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return shRepairInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"REPAIR_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("REPAIR_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        shRepairInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     * 修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        shRepairInfoService.updateStatus(pd);
    }
}
