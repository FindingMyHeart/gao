package com.fh.service.xtgl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import com.fh.utilmy.CurrentStaff;


@Service("caidanService")
public class CaidanService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("CaidanMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("CaidanMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("CaidanMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("CaidanMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		List<PageData> list = new ArrayList<PageData>();
		if(cstaff.getSTAFF_LEVEL()!=9){
			pd.put("staff_id", cstaff.getSTAFF_ID());
		}
		list = (List<PageData>)dao.findForList("CaidanMapper.listAll", pd);
		
		return list;
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("CaidanMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("CaidanMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

