package com.fh.service.cw;

import com.fh.entity.Page;
import com.fh.service.cw.basecwfeeapplyinfo.BaseCwFeeApplyInfoService;
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
@Service("feeApplyService")
public class FeeApplyService {

    @Autowired
    private BaseCwFeeApplyInfoService baseCwFeeApplyInfoService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private CwAccountService cwAccountService;


    /**
     * 1、新增
     */
    public PageData save(PageData pd) throws Exception {
        PageData result = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("FEE_ID", UuidUtil.get32UUID());//放入主键ID 
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("STATUS", "1");//新建
        pd.put("CAIWU_STATUS", "1");//新建（财务状态）
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        String fee_sn = "FY" + baseCwFeeApplyInfoService.getApplybuySn();
        pd.put("FEE_SN",fee_sn);
        baseCwFeeApplyInfoService.save(pd);
        result.put("FEE_SN",fee_sn);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"FEE_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseCwFeeApplyInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseCwFeeApplyInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        PageData params = new PageData();
        List<PageData> resourceList = new ArrayList<PageData>();
        result = baseCwFeeApplyInfoService.findById(pd);
        //获取文件列表
        if(result != null && result.get("RESOURCEIDS") != null && !result.get("RESOURCEIDS").toString().equals("")){
            String resourceIds = result.get("RESOURCEIDS").toString();
            params = new PageData();
            params.put("RESOURCE_IDS",resourceIds);
            resourceList = resourceService.listAll(params);
            result.put("resourceList",resourceList);
        }
        //获取开户行列表
        if(result != null && result.get("CW_KAIHU_BANK") != null && !result.get("CW_KAIHU_BANK").toString().equals("")){
            params = new PageData();
            params.put("KAIHU_BANK",result.get("CW_KAIHU_BANK"));
            List<PageData> cwAccountList = cwAccountService.listAll(params);
            result.put("cwAccountList",cwAccountList);
        }
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return baseCwFeeApplyInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseCwFeeApplyInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"FEE_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("FEE_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        baseCwFeeApplyInfoService.deleteAll(ArrayDATA_IDS);
    }
    /**
     * 8、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("CHECK_TIME",DateUtil.getTime());
        pd.put("CHECK_USERID",staff.getSTAFF_ID());
        baseCwFeeApplyInfoService.updateStatus(pd);
    }


    /**
     * 9、添加财务信息
     */
    public PageData addInfo(PageData pd) throws Exception {
        PageData result = new PageData();
        PageData params = new PageData();
        baseCwFeeApplyInfoService.addInfo(pd);
        return result;
    }

    /**
     * 9、添加财务信息
     */
    public PageData complete(PageData pd) throws Exception {
        PageData result = new PageData();
        PageData params = new PageData();
        String CAIWU_TIME = DateUtil.getTime();
        params.put("CAIWU_STATUS","2");//标记完成
        params.put("CAIWU_TIME",CAIWU_TIME);
        params.put("FEE_ID",pd.get("FEE_ID"));
        baseCwFeeApplyInfoService.complete(params);
        return result;
    }
}
