package com.fh.service.afterSale;

import com.fh.entity.Page;
import com.fh.service.afterSale.shprojectcontact.ShProjectContactService;
import com.fh.service.afterSale.shprojectinfo.ShProjectInfoService;
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
 * Created by 11029 on 2018/5/29.
 */
@Service("afterSaleProjectService")
public class AfterSaleProjectService {

    @Autowired
    private ShProjectInfoService shProjectInfoService;

    @Autowired
    private ShProjectContactService shProjectContactService;

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
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        shProjectInfoService.save(pd);

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
            shProjectContactService.save(params);
        }

    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"PROJECT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        shProjectInfoService.delete(pd);
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
        shProjectInfoService.edit(pd);
        PageData params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        shProjectContactService.deleteByProjectId(params);
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
            shProjectContactService.save(params);
        }
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = shProjectInfoService.findById(pd);
        if(result == null || result.get("PROJECT_ID") == null || result.getString("PROJECT_ID") == null || result.getString("PROJECT_ID").equals("")){
            return result;
        }
        String PROJECT_ID = result.getString("PROJECT_ID");
        PageData params = new PageData();
        params.put("PROJECT_ID",PROJECT_ID);
        List<PageData> contactList = shProjectContactService.listAll(params);
        result.put("contactList",contactList);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return shProjectInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return shProjectInfoService.listAll(pd);
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
        shProjectInfoService.deleteAll(ArrayDATA_IDS);
    }
}
