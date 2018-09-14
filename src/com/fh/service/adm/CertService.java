package com.fh.service.adm;

import com.fh.entity.Page;
import com.fh.service.adm.admcertinfo.AdmCertInfoService;
import com.fh.service.adm.admcertlend.AdmCertLendService;
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
 *  资质的service
 * Created by 11029 on 2018/6/23.
 */
@Service("certService")
public class CertService {
    @Autowired
    private AdmCertInfoService admCertInfoService;

    @Autowired
    private AdmCertLendService admCertLendService;

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
        String CERT_ID = UuidUtil.get32UUID();
        pd.put("CERT_ID",CERT_ID);//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("USE_CASE","1");
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        admCertInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CERT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        admCertInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String CERT_ID = "";
        if(pd.get("CERT_ID") == null || pd.getString("CERT_ID") == null || pd.getString("CERT_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        CERT_ID = pd.getString("CERT_ID");
        admCertInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = admCertInfoService.findById(pd);

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
        return admCertInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return admCertInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CERT_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("CERT_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        admCertInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     *  8、修改使用情况
     */
    public void updateUseCase(PageData pd) throws Exception {
        admCertInfoService.updateUseCase(pd);
        //如果是归还状态，结束掉审核通过的数据
        if(pd.get("CERT_ID") != null && !pd.get("CERT_ID").toString().equals("")
                && pd.get("USE_CASE") != null && pd.get("USE_CASE").toString().equals("1")){
            PageData params = new PageData();
            params.put("CERT_ID",pd.get("CERT_ID"));
            params.put("STATUS","4");
            admCertLendService.updateZjStatus(params);
        }
    }
}
