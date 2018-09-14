package com.fh.service.customer;

import com.fh.entity.Page;
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
import java.util.UUID;

/**
 * Created by 11029 on 2018/4/30.
 */
@Service("customerService")
public class CustomerService {

    @Autowired
    private BaseClientInfoService baseClientInfoService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("CLIENT_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        baseClientInfoService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CLIENT_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseClientInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseClientInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        return baseClientInfoService.findById(pd);
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return baseClientInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseClientInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"CLIENT_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("CLIENT_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        baseClientInfoService.deleteAll(ArrayDATA_IDS);
    }

    /**
     *   获取所有建档人的列表
     * @param pd
     * @return
     */
    public List<PageData> getAllJdrList(PageData pd) {
        List<PageData> list = new ArrayList<PageData>();
        try {
            list = baseClientInfoService.getAllJdrList(pd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
