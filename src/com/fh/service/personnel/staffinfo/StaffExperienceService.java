package com.fh.service.personnel.staffinfo;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by 11029 on 2018/5/7.
 */
@Service("staffExperienceService")
public class StaffExperienceService {

    private final String ns = "StaffExperienceMapper.";

    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /*
    * 新增
    */
    public void save(PageData pd)throws Exception{
        dao.save(ns + "save", pd);
    }

    /*
    *列表(全部)
    */
    public List<PageData> listAll(PageData pd)throws Exception{
        return (List<PageData>)dao.findForList(ns + "listAll", pd);
    }
    
    /**
     *  根据所属 staff_id 删除所有的相关记录
     * @param param
     * @throws Exception
     */
    public void deleteByStaffId(PageData param) throws Exception {
        dao.delete(ns + "deleteByStaffId",param);
    }
}
