package com.fh.service.invoice;

import com.fh.entity.Page;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 11029 on 2018/5/1.
 */
@Service("invoiceService")
public class InvoiceService {

    @Autowired
    private BaseInvoiceInfoService baseInvoiceInfoService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("INVOICE_ID", UuidUtil.get32UUID());//放入主键ID  
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        baseInvoiceInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"INVOICE_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseInvoiceInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseInvoiceInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        return baseInvoiceInfoService.findById(pd);
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return baseInvoiceInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseInvoiceInfoService.listAll(pd);
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
        baseInvoiceInfoService.deleteAll(ArrayDATA_IDS);
    }
}
