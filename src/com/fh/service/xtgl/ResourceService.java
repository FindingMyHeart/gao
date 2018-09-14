package com.fh.service.xtgl;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by 11029 on 2018/6/28.
 */
@Service("resourceService")
public class ResourceService {


    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /*
* 新增
*/
    public void save(PageData pd)throws Exception{
        dao.save("ResourceMapper.save", pd);
    }

    /*
    * 删除
    */
    public void delete(PageData pd)throws Exception{
        dao.delete("ResourceMapper.delete", pd);
    }

    /*
    * 修改
    */
    public void edit(PageData pd)throws Exception{
        dao.update("ResourceMapper.edit", pd);
    }

    /*
    *列表
    */
    public List<PageData> list(Page page)throws Exception{
        return (List<PageData>)dao.findForList("ResourceMapper.datalistPage", page);
    }

    /*
    *列表(全部)
    */
    public List<PageData> listAll(PageData pd)throws Exception{
        return (List<PageData>)dao.findForList("ResourceMapper.listAll", pd);
    }

    /*
    * 通过id获取数据
    */
    public PageData findById(PageData pd)throws Exception{
        return (PageData)dao.findForObject("ResourceMapper.findById", pd);
    }

    /*
    * 批量删除
    */
    public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
        dao.delete("ResourceMapper.deleteAll", ArrayDATA_IDS);
    }

    public void updateUseCase(PageData pd) throws Exception {
        dao.update("ResourceMapper.updateUseCase",pd);
    }


}
