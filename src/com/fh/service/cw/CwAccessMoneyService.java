package com.fh.service.cw;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.service.material.basematerialinfo.BaseMaterialInfoService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.Tools;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

/**
 * Created by 11029 on 2018/5/7.
 */
@Service("cwAccessMoneyService")
public class CwAccessMoneyService {
   


    @Resource(name = "daoSupport")
	private DaoSupport dao;
    /**
     * 1、新增
     */
    public void savesimple(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("ACCESS_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        this.save(pd);
    }
    
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("CwAccessMoneyMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("CwAccessMoneyMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		if(Tools.isEmpty(pd.getString("ACCESS_ID"))){
			throw new Exception("ID不能为空");
		}
		dao.update("CwAccessMoneyMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("CwAccessMoneyMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("CwAccessMoneyMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("CwAccessMoneyMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("CwAccessMoneyMapper.deleteAll", ArrayDATA_IDS);
	}

	
}
