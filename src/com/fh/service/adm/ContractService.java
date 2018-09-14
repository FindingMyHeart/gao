package com.fh.service.adm;

import com.fh.entity.Page;
import com.fh.service.adm.admcontractinfo.AdmContractInfoService;
import com.fh.service.adm.admcontractlend.AdmContractLendService;
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
 *  行政合同的service
 * Created by 11029 on 2018/6/23.
 */
@Service("contractService")
public class ContractService {
    @Autowired
    private AdmContractInfoService admContractInfoService;

    @Autowired
    private AdmContractLendService admContractLendService;

    @Autowired
    private ResourceService resourceService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        PageData result = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String CONTRACT_ID = UuidUtil.get32UUID();
        pd.put("CONTRACT_ID",CONTRACT_ID);//放入主键ID
        pd.put("USE_CASE","1");// 在库
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        admContractInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CONTRACT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        admContractInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String CONTRACT_ID = "";
        if(pd.get("CONTRACT_ID") == null || pd.getString("CONTRACT_ID") == null || pd.getString("CONTRACT_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        CONTRACT_ID = pd.getString("CONTRACT_ID");
        admContractInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = admContractInfoService.findById(pd);

        List<PageData> resourceList = new ArrayList<PageData>();
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
        return admContractInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return admContractInfoService.listAll(pd);
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
        admContractInfoService.deleteAll(ArrayDATA_IDS);
    }
    /**
     *  8、修改使用情况
     */
    public void updateUseCase(PageData pd) throws Exception {
        admContractInfoService.updateUseCase(pd);

        //如果是归还状态，结束掉审核通过的数据
        if(pd.get("CONTRACT_ID") != null && !pd.get("CONTRACT_ID").toString().equals("")
                && pd.get("USE_CASE") != null && pd.get("USE_CASE").toString().equals("1")){
            PageData params = new PageData();
            params.put("CONTRACT_ID",pd.get("CONTRACT_ID"));
            params.put("STATUS","4");
            admContractLendService.updateZjStatus(params);
        }
    }

}
