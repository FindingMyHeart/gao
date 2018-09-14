package com.fh.service.cw;

import com.fh.entity.Page;
import com.fh.service.cw.basecwinvoiceinfo.BaseCwInvoiceInfoService;
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
@Service("invoiceInfoService")
public class InvoiceInfoService {

    @Autowired
    private BaseCwInvoiceInfoService baseCwInvoiceInfoService;

    @Autowired
    private ResourceService resourceService;


    /**
     * 1、新增
     */
    public PageData save(PageData pd) throws Exception {
        PageData result = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("INVOICE_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("STATUS", "1");//新建
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        String invoice_sn = "FP" + baseCwInvoiceInfoService.getApplybuySn();
        pd.put("INVOICE_SN",invoice_sn);
        baseCwInvoiceInfoService.save(pd);
        result.put("INVOICE_SN",invoice_sn);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"INVOICE_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseCwInvoiceInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseCwInvoiceInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        List<PageData> resourceList = new ArrayList<PageData>();
        result = baseCwInvoiceInfoService.findById(pd);
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
        return baseCwInvoiceInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseCwInvoiceInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"INVOICE_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("INVOICE_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        baseCwInvoiceInfoService.deleteAll(ArrayDATA_IDS);
    }



}
