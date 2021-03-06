package com.fh.service.adm;

import com.fh.entity.Page;
import com.fh.service.adm.admdocumentinfo.AdmDocumentInfoService;
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
 *  资质的service
 * Created by 11029 on 2018/6/23.
 */
@Service("documentService")
public class DocumentService {
    @Autowired
    private AdmDocumentInfoService admDocumentInfoService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String DOCUMENT_ID = UuidUtil.get32UUID();
        pd.put("DOCUMENT_ID",DOCUMENT_ID);//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        admDocumentInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"DOCUMENT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        admDocumentInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String DOCUMENT_ID = "";
        if(pd.get("DOCUMENT_ID") == null || pd.getString("DOCUMENT_ID") == null || pd.getString("DOCUMENT_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        DOCUMENT_ID = pd.getString("DOCUMENT_ID");
        admDocumentInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = admDocumentInfoService.findById(pd);
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return admDocumentInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return admDocumentInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"DOCUMENT_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("DOCUMENT_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        admDocumentInfoService.deleteAll(ArrayDATA_IDS);
    }
}
