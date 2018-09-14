package com.fh.service.personnel;

import com.fh.entity.Page;
import com.fh.service.personnel.staffinfo.StaffCertService;
import com.fh.service.personnel.staffinfo.StaffExperienceService;
import com.fh.service.personnel.staffinfo.StaffFamilyService;
import com.fh.service.xtgl.ResourceService;
import com.fh.service.xtgl.StaffService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import com.mysql.fabric.xmlrpc.base.Params;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/7/15.
 */
@Service("staffManageService")
public class StaffManageService {

    @Autowired
    private StaffService staffService;

    @Autowired
    private StaffCertService staffCertService;

    @Autowired
    private StaffExperienceService staffExperienceService;

    @Autowired
    private StaffFamilyService staffFamilyService;

    @Autowired
    private ResourceService resourceService;

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
        String staff_code = "ZY" + staffService.getApplybuySn();


        String staff_id = UuidUtil.get32UUID();
        pd.put("staff_id", staff_id);//放入主键ID
        pd.put("create_time", DateUtil.getTime());
        pd.put("staff_code", staff_code);
        pd.put("status", "1");
        pd.put("staff_level", "0");
        pd.put("vacation_type", "fou");//休假类型
        pd.put("create_userid", staff.getSTAFF_ID());
        pd.put("if_deleted", "0");
        staffService.save(pd);

        //新增资质认证
        //插入子表信息
        if(pd.getString("certList") != null && !pd.getString("certList").equals("")){
            JSONArray item1 = JSONArray.fromObject(pd.getString("certList"));
            for (int i = 0; i < item1.size(); i++) {
                if(item1.get(i) == null){
                    continue;
                }
                JSONObject jo = (JSONObject) item1.get(i);
                params = new PageData();
                params.put("cert_id",UuidUtil.get32UUID());
                params.put("staff_id",staff_id);
                params.put("num",jo.get("num"));
                params.put("cert_name",jo.get("cert_name"));
                params.put("get_date",jo.get("get_date"));
                params.put("valid_date",jo.get("valid_date"));
                params.put("memo",jo.get("memo"));
                staffCertService.save(params);
            }
        }


        //新增【工作经历】
        //插入子表信息
        if(pd.getString("experienceList") != null && !pd.getString("experienceList").equals("")){
            JSONArray item2 = JSONArray.fromObject(pd.getString("experienceList"));
            for (int i = 0; i < item2.size(); i++) {
                if(item2.get(i) == null){
                    continue;
                }
                JSONObject jo = (JSONObject) item2.get(i);
                params = new PageData();
                params.put("experience_id",UuidUtil.get32UUID());
                params.put("staff_id",staff_id);
                params.put("num",jo.get("num"));
                params.put("work_company",jo.get("work_company"));
                params.put("work_post",jo.get("work_post"));
                params.put("work_time",jo.get("work_time"));
                params.put("leave_reason",jo.get("leave_reason"));
                params.put("reference",jo.get("reference"));
                params.put("reference_tel",jo.get("reference_tel"));
                staffExperienceService.save(params);
            }
        }

        //新增【家庭成员信息】
        //插入子表信息
        if(pd.getString("familyList") != null && !pd.getString("familyList").equals("")){
            JSONArray item3 = JSONArray.fromObject(pd.getString("familyList"));
            for (int i = 0; i < item3.size(); i++) {
                if(item3.get(i) == null){
                    continue;
                }
                JSONObject jo = (JSONObject) item3.get(i);
                params = new PageData();
                params.put("family_id",UuidUtil.get32UUID());
                params.put("staff_id",staff_id);
                params.put("num",jo.get("num"));
                params.put("name",jo.get("name"));
                params.put("relation",jo.get("relation"));
                params.put("address",jo.get("address"));
                params.put("work_company",jo.get("work_company"));
                params.put("post",jo.get("post"));
                params.put("tel",jo.get("tel"));
                staffFamilyService.save(params);
            }
        }
        result.put("staff_code",staff_code);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"staff_id")){
            throw new Exception("没有发现可删除的记录！");
        }
        staffService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        PageData params = new PageData();
        if(pd.get("staff_id") == null || pd.get("staff_id").toString().equals("")){
            throw new Exception("没有可修改的记录！");
        }
        String staff_id = pd.get("staff_id").toString();
        staffService.edit(pd);

        //清空三张表
        params = new PageData();
        params.put("staff_id",staff_id);
        staffCertService.deleteByStaffId(params);
        staffExperienceService.deleteByStaffId(params);
        staffFamilyService.deleteByStaffId(params);

        //新增资质认证
        //插入子表信息
        if(pd.getString("certList") != null && !pd.getString("certList").equals("")){
            JSONArray item1 = JSONArray.fromObject(pd.getString("certList"));
            for (int i = 0; i < item1.size(); i++) {
                if(item1.get(i) == null){
                    continue;
                }
                JSONObject jo = (JSONObject) item1.get(i);
                params = new PageData();
                params.put("cert_id",UuidUtil.get32UUID());
                params.put("staff_id",staff_id);
                params.put("num",jo.get("num"));
                params.put("cert_name",jo.get("cert_name"));
                params.put("get_date",jo.get("get_date"));
                params.put("valid_date",jo.get("valid_date"));
                params.put("memo",jo.get("memo"));
                staffCertService.save(params);
            }
        }


        //新增【工作经历】
        //插入子表信息
        if(pd.getString("experienceList") != null && !pd.getString("experienceList").equals("")){
            JSONArray item2 = JSONArray.fromObject(pd.getString("experienceList"));
            for (int i = 0; i < item2.size(); i++) {
                if(item2.get(i) == null){
                    continue;
                }
                JSONObject jo = (JSONObject) item2.get(i);
                params = new PageData();
                params.put("experience_id",UuidUtil.get32UUID());
                params.put("staff_id",staff_id);
                params.put("num",jo.get("num"));
                params.put("work_company",jo.get("work_company"));
                params.put("work_post",jo.get("work_post"));
                params.put("work_time",jo.get("work_time"));
                params.put("leave_reason",jo.get("leave_reason"));
                params.put("reference",jo.get("reference"));
                params.put("reference_tel",jo.get("reference_tel"));
                staffExperienceService.save(params);
            }
        }

        //新增【家庭成员信息】
        //插入子表信息
        if(pd.getString("familyList") != null && !pd.getString("familyList").equals("")){
            JSONArray item3 = JSONArray.fromObject(pd.getString("familyList"));
            for (int i = 0; i < item3.size(); i++) {
                if(item3.get(i) == null){
                    continue;
                }
                JSONObject jo = (JSONObject) item3.get(i);
                params = new PageData();
                params.put("family_id",UuidUtil.get32UUID());
                params.put("staff_id",staff_id);
                params.put("num",jo.get("num"));
                params.put("name",jo.get("name"));
                params.put("relation",jo.get("relation"));
                params.put("address",jo.get("address"));
                params.put("work_company",jo.get("work_company"));
                params.put("post",jo.get("post"));
                params.put("tel",jo.get("tel"));
                staffFamilyService.save(params);
            }
        }

    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        PageData params = new PageData();
        List<PageData> resourceList = new ArrayList<PageData>();
        result = staffService.findById(pd);

        if(result != null ){
            params.put("staff_id",result.get("staff_id"));
        }
        //certList
        List<PageData> certList = staffCertService.listAll(params);
        //experienceList
        List<PageData> experienceList = staffExperienceService.listAll(params);
        //familyList
        List<PageData> familyList = staffFamilyService.listAll(params);

        result.put("certList",certList);
        result.put("experienceList",experienceList);
        result.put("familyList",familyList);

        //获取文件列表
        if(result != null && result.get("resourceIds") != null && !result.get("resourceIds").toString().equals("")){
            String resourceIds = result.get("resourceIds").toString();
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
        return staffService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return staffService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"staff_ids")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("staff_ids");
        String[] ArrayDATA_IDS = clientIds.split(",");
        staffService.deleteAll(ArrayDATA_IDS);
    }


}
