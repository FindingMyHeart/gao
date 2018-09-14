package com.fh.service.buy;

import com.fh.entity.Page;
import com.fh.service.buy.busbuycontractinfo.BusBuyContractInfoService;
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
 * Created by 11029 on 2018/6/9.
 */
@Service("buyContractService")
public class BuyContractService {
    @Autowired
    private BusBuyContractInfoService busBuyContractInfoService;

    /**
     * 1、新增
     */
    public PageData save(PageData pd) throws Exception {
        PageData result = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String contract_no = busBuyContractInfoService.getContractNo();
        pd.put("CONTRACT_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CONTRACT_NO", contract_no);//合同编号
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("DEPT_ID", staff.getDEPT_ID());
        pd.put("IF_DELETED", "0");
        busBuyContractInfoService.save(pd);
        result.put("CONTRACT_NO",contract_no);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CONTRACT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        busBuyContractInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        busBuyContractInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        return busBuyContractInfoService.findById(pd);
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return busBuyContractInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return busBuyContractInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CONTRACT_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("CONTRACT_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        busBuyContractInfoService.deleteAll(ArrayDATA_IDS);
    }
}
