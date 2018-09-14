package com.fh.service.cw;

import com.fh.entity.Page;
import com.fh.service.cw.basecwinvoiceapply.BaseCwInvoiceApplyService;
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
 * Created by 11029 on 2018/7/15.
 */
@Service("invoiceApplyService")
public class InvoiceApplyService {


    @Autowired
    private BaseCwInvoiceApplyService baseCwInvoiceApplyService;

    @Autowired
    private ResourceService resourceService;

    /**
     * 1、新增
     */
    public PageData save(PageData pd) throws Exception {
        PageData reuslt = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("APPLY_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("STATUS", "1");//新建
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        String apply_sn = "SQ" + baseCwInvoiceApplyService.getApplybuySn();
        pd.put("APPLY_SN",apply_sn);
        baseCwInvoiceApplyService.save(pd);
        reuslt.put("APPLY_SN",apply_sn);
        return reuslt;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"APPLY_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseCwInvoiceApplyService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseCwInvoiceApplyService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        List<PageData> resourceList = new ArrayList<PageData>();
        result = baseCwInvoiceApplyService.findById(pd);
        //获取文件列表
        if(result != null && result.get("RESOURCEIDS") != null && !result.get("RESOURCEIDS").toString().equals("")){
            String resourceIds = result.get("RESOURCEIDS").toString();
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
        return baseCwInvoiceApplyService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseCwInvoiceApplyService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"APPLY_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("APPLY_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        baseCwInvoiceApplyService.deleteAll(ArrayDATA_IDS);
    }


    /**
     * 9、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("CHECK_TIME",DateUtil.getTime());
        pd.put("CHECK_USERID",staff.getSTAFF_ID());
        baseCwInvoiceApplyService.updateStatus(pd);
    }


}
