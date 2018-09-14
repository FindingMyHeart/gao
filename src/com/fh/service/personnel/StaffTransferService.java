package com.fh.service.personnel;

import com.fh.entity.Page;
import com.fh.service.personnel.stafftransferinfo.StaffTransferInfoService;
import com.fh.service.xtgl.ResourceService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 人事变动 service
 * Created by 11029 on 2018/5/1.
 */
@Service("staffTransferService")
public class StaffTransferService {

    @Autowired
    private StaffTransferInfoService staffTransferInfoService;
    @Autowired
    private ResourceService resourceService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("TRANSFER_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("STATUS", "1");//新建
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        staffTransferInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"TRANSFER_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        staffTransferInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        staffTransferInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        List<PageData> resourceList = new ArrayList<PageData>();
        result = staffTransferInfoService.findById(pd);
        //获取文件列表
        if(result != null && result.get("JIAOJIE_FILE") != null && !result.get("JIAOJIE_FILE").toString().equals("")){
            String resourceIds = result.get("JIAOJIE_FILE").toString();
            PageData params = new PageData();
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
        return staffTransferInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return staffTransferInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"TRANSFER_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("TRANSFER_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        staffTransferInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     * 9、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        staffTransferInfoService.updateStatus(pd);
    }


}
