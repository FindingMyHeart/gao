package com.fh.service.adm;

import com.fh.entity.Page;
import com.fh.service.adm.admcertinfo.AdmCertInfoService;
import com.fh.service.adm.admcertlend.AdmCertLendService;
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
 *  资质的借用的service
 * Created by 11029 on 2018/6/23.
 */
@Service("certLendService")
public class CertLendService {
    @Autowired
    private AdmCertLendService admCertLendService;

    @Autowired
    private AdmCertInfoService admCertInfoService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String LEND_ID = UuidUtil.get32UUID();
        pd.put("LEND_ID",LEND_ID);//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("STATUS", "1");//默认是在库状态
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        admCertLendService.save(pd);

        //新增一条借用的时候，修改资质的借用状态
//        PageData params = new PageData();
//        params.put("USE_CASE","2");//借用状态
//        params.put("CERT_ID",pd.get("CERT_ID"));//借用资质的主键ID
//        admCertInfoService.updateUseCase(params);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"LEND_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        admCertLendService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String LEND_ID = "";
        if(pd.get("LEND_ID") == null || pd.getString("LEND_ID") == null || pd.getString("LEND_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        LEND_ID = pd.getString("LEND_ID");
        admCertLendService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = admCertLendService.findById(pd);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return admCertLendService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return admCertLendService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"LEND_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("LEND_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        admCertLendService.deleteAll(ArrayDATA_IDS);
    }


    /**
     * 修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        if(pd.get("STATUS") == null || pd.get("STATUS").toString().equals("")){
            throw new Exception("无效的操作！");
        }
        if(pd.get("LEND_ID") == null || pd.get("LEND_ID").toString().equals("")){
            throw new Exception("无效的操作！");
        }
        if(pd.get("STATUS").toString().equals("2") && (pd.get("CERT_ID") == null || pd.get("CERT_ID").toString().equals(""))){
            throw new Exception("无效的操作！");
        }
        String STATUS = pd.get("STATUS").toString();
        String LEND_ID = pd.get("LEND_ID").toString();


        if(STATUS.equals("2")){
            String CERT_ID = pd.get("CERT_ID").toString();
            PageData params = new PageData();
            params.put("CERT_ID",CERT_ID);
            PageData result = admCertInfoService.findById(params);
            if(result == null){
                throw new Exception("无效的操作！");
            }
            if(result.get("USE_CASE") != null && !result.get("USE_CASE").toString().equals("1")){
                throw new Exception("无效的操作：该条资质已被借出！");
            }
            //修改资质的状态
            params = new PageData();
            params.put("CERT_ID",CERT_ID);
            params.put("USE_CASE","2");
            admCertInfoService.updateUseCase(params);
        }
        admCertLendService.updateStatus(pd);
    }
}
