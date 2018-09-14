package com.fh.service.store;

import com.fh.entity.Page;
import com.fh.service.store.storelocationinfo.StoreLocationInfoService;
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
 * Created by 11029 on 2018/5/1.
 */
@Service("kwglService")
public class KwglService {

    @Autowired
    private StoreLocationInfoService storeLocationInfoService;
    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("LOCATION_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        storeLocationInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"LOCATION_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        storeLocationInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        storeLocationInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        return storeLocationInfoService.findById(pd);
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return storeLocationInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return storeLocationInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"LOCATION_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("LOCATION_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        storeLocationInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     *  8、获取所有供应商性质列表
     */
    public List<PageData> getAllKwglList(PageData pd) {
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = storeLocationInfoService.getAllKwglList(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
