package com.fh.service.project;

import com.fh.entity.Page;
import com.fh.service.project.busprojectcontact.BusProjectContactService;
import com.fh.service.project.busprojectinfo.BusProjectInfoService;
import com.fh.service.project.busprojectmoneydetail.BusProjectMoneyDetailService;
import com.fh.service.project.busprojectshenhua.BusProjectShenhuaService;
import com.fh.service.xtgl.ResourceService;
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
 * Created by 11029 on 2018/5/21.
 */
@Service("projectInfoService")
public class ProjectInfoService {

    @Autowired
    private BusProjectInfoService busProjectInfoService;

    @Autowired
    private BusProjectContactService busProjectContactService;

    @Autowired
    private BusProjectShenhuaService busProjectShenhuaService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private BusProjectMoneyDetailService busProjectMoneyDetailService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        PageData params = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String PROJECT_ID = UuidUtil.get32UUID();
        pd.put("PROJECT_ID",PROJECT_ID);//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("STATUS","1");// 状态
        pd.put("CAIWU_STATUS","1");//财务状态  1 新建
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        busProjectInfoService.save(pd);

        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("contactList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("CONTACT_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("ORDER_NO",jo.get("ORDER_NO"));
            params.put("CONTACT_NAME",jo.get("CONTACT_NAME"));
            params.put("CONTACT_TEL",jo.get("CONTACT_TEL"));
            params.put("MEMO",jo.get("MEMO"));
            params.put("CONTACT_TYPE",jo.get("CONTACT_TYPE"));
            busProjectContactService.save(params);
        }

        //新增深化列表
        JSONArray item2 = JSONArray.fromObject(pd.getString("shenHuaList"));
        for (int i = 0; i < item2.size(); i++) {
            JSONObject jo = (JSONObject) item2.get(i);
            params = new PageData();
            params.put("SHENHUA_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));
            params.put("MEMO",jo.get("MEMO"));
            busProjectShenhuaService.save(params);
        }


        //新增【累计回款金额明细】
        JSONArray item3 = JSONArray.fromObject(pd.getString("backMoneyList"));
        for (int i = 0; i < item3.size(); i++) {
            JSONObject jo = (JSONObject) item3.get(i);
            params = new PageData();
            params.put("DETAIL_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MONEY_TYPE","1");
            params.put("MONEY_DATE",jo.get("MONEY_DATE"));
            params.put("FEE_AMOUNT",jo.get("FEE_AMOUNT"));
            params.put("MEMO",jo.get("MEMO"));
            busProjectMoneyDetailService.save(params);
        }

        //新增【累计开票金额明细】
        JSONArray item4 = JSONArray.fromObject(pd.getString("invoiceMoneyList"));
        for (int i = 0; i < item4.size(); i++) {
            JSONObject jo = (JSONObject) item4.get(i);
            params = new PageData();
            params.put("DETAIL_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MONEY_TYPE","2");
            params.put("MONEY_DATE",jo.get("MONEY_DATE"));
            params.put("FEE_AMOUNT",jo.get("FEE_AMOUNT"));
            params.put("MEMO",jo.get("MEMO"));
            busProjectMoneyDetailService.save(params);
        }


    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"PROJECT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        busProjectInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String PROJECT_ID = "";
        if(pd.get("PROJECT_ID") == null || pd.getString("PROJECT_ID") == null || pd.getString("PROJECT_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        PROJECT_ID = pd.getString("PROJECT_ID");
        busProjectInfoService.edit(pd);
        PageData params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        busProjectContactService.deleteByProjectId(params);
        //新增联系人
        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("contactList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("CONTACT_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("ORDER_NO",jo.get("ORDER_NO"));
            params.put("CONTACT_NAME",jo.get("CONTACT_NAME"));
            params.put("CONTACT_TEL",jo.get("CONTACT_TEL"));
            params.put("MEMO",jo.get("MEMO"));
            params.put("CONTACT_TYPE",jo.get("CONTACT_TYPE"));
            busProjectContactService.save(params);
        }

        params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        busProjectShenhuaService.deleteByProjectId(params);


        //新增深化列表
        JSONArray item2 = JSONArray.fromObject(pd.getString("shenHuaList"));
        for (int i = 0; i < item2.size(); i++) {
            JSONObject jo = (JSONObject) item2.get(i);
            params = new PageData();
            params.put("SHENHUA_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));
            params.put("MEMO",jo.get("MEMO"));
            busProjectShenhuaService.save(params);
        }

        params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        busProjectMoneyDetailService.deleteByProjectId(params);

        //新增【累计回款金额明细】
        JSONArray item3 = JSONArray.fromObject(pd.getString("backMoneyList"));
        for (int i = 0; i < item3.size(); i++) {
            JSONObject jo = (JSONObject) item3.get(i);
            params = new PageData();
            params.put("DETAIL_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MONEY_TYPE","1");
            params.put("MONEY_DATE",jo.get("MONEY_DATE"));
            params.put("FEE_AMOUNT",jo.get("FEE_AMOUNT"));
            params.put("MEMO",jo.get("MEMO"));
            busProjectMoneyDetailService.save(params);
        }

        //新增【累计开票金额明细】
        JSONArray item4 = JSONArray.fromObject(pd.getString("invoiceMoneyList"));
        for (int i = 0; i < item4.size(); i++) {
            JSONObject jo = (JSONObject) item4.get(i);
            params = new PageData();
            params.put("DETAIL_ID",UuidUtil.get32UUID());
            params.put("PROJECT_ID",PROJECT_ID);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("MONEY_TYPE","2");
            params.put("MONEY_DATE",jo.get("MONEY_DATE"));
            params.put("FEE_AMOUNT",jo.get("FEE_AMOUNT"));
            params.put("MEMO",jo.get("MEMO"));
            busProjectMoneyDetailService.save(params);
        }




    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = busProjectInfoService.findById(pd);
        if(result == null || result.get("PROJECT_ID") == null || result.getString("PROJECT_ID") == null || result.getString("PROJECT_ID").equals("")){
            return result;
        }
        String PROJECT_ID = result.getString("PROJECT_ID");
        PageData params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        List<PageData> contactList = busProjectContactService.listAll(params);
        result.put("contactList",contactList);

        params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        List<PageData> shenHuaList = busProjectShenhuaService.listAll(params);
        result.put("shenHuaList",shenHuaList);

        params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        params.put("MONEY_TYPE","1");
        List<PageData> backMoneyList = busProjectMoneyDetailService.listAll(params);
        result.put("backMoneyList",backMoneyList);

        params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        params.put("MONEY_TYPE","2");
        List<PageData> invoiceMoneyList = busProjectMoneyDetailService.listAll(params);
        result.put("invoiceMoneyList",invoiceMoneyList);

        List<PageData> resourceList = new ArrayList<PageData>();
        //获取文件列表
        if(result != null && result.get("RESOURCEIDS") != null && !result.get("RESOURCEIDS").toString().equals("")){
            String resourceIds = result.get("RESOURCEIDS").toString();
            params = new PageData();
            params.put("RESOURCE_IDS",resourceIds);
            resourceList = resourceService.listAll(params);
            result.put("resourceList",resourceList);
        }

        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return busProjectInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return busProjectInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"PROJECT_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("PROJECT_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        busProjectInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     *  8、获取所有的项目的列表（下拉列表）
     */
    public List<PageData> getAllProjectList(PageData pd) {
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = busProjectInfoService.getAllProjectList(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     *  8、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        busProjectInfoService.updateStatus(pd);
    }

    /**
     *  9、应收款单列表
     */
    public List<PageData> yskdList(Page page) throws Exception {
        return busProjectInfoService.yskdList(page);
    }

    /**
     * 获取详细的应收款单
     */
    public PageData findForYskd(PageData pd) throws Exception {
        PageData result = new PageData();
        result = busProjectInfoService.findForYskd(pd);
        return result;
    }

    /**
     * 11、添加信息
     */
    public void addInfo(PageData pd) throws Exception {
        busProjectInfoService.addInfo(pd);
    }

    /**
     * 12、完成
     */
    public PageData complete(PageData pd) throws Exception {
        PageData result = new PageData();
        PageData params = new PageData();
        String CAIWU_TIME = DateUtil.getTime();
        params.put("CAIWU_STATUS","2");//标记完成
        params.put("CAIWU_TIME",CAIWU_TIME);
        params.put("PROJECT_ID",pd.get("PROJECT_ID"));
        busProjectInfoService.complete(params);
        return result;
    }

    /**
     * 13、转入售后
     */
    public void toSh(PageData pd) throws Exception {
        busProjectInfoService.toSh(pd);
    }

}
