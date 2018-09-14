package com.fh.service.material;

import com.fh.entity.Page;
import com.fh.service.material.basematerialinfo.BaseMaterialInfoService;
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
 * Created by 11029 on 2018/5/7.
 */
@Service("materialService")
public class MaterialService {
    @Autowired
    private BaseMaterialInfoService baseMaterialInfoService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("MATERIAL_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        baseMaterialInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"MATERIAL_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseMaterialInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseMaterialInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        return baseMaterialInfoService.findById(pd);
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return baseMaterialInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseMaterialInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"MATERIAL_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("MATERIAL_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        baseMaterialInfoService.deleteAll(ArrayDATA_IDS);
    }
}
