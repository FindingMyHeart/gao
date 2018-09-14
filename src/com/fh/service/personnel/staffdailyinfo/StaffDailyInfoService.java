package com.fh.service.personnel.staffdailyinfo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("staffdailyinfoService")
public class StaffDailyInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("StaffDailyInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("StaffDailyInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("StaffDailyInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("StaffDailyInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("StaffDailyInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("StaffDailyInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("StaffDailyInfoMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 根据日期和用户ID查看是否已经上报过日报
	 * @param param
	 * @return
	 */
    public List<PageData> findByUidAndDate(PageData param) throws Exception {
    	return (List<PageData>) dao.findForList("StaffDailyInfoMapper.findByUidAndDate",param);
    }
}

