package com.fh.service.project.busprojectmoneydetail;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service("busProjectMoneyDetailService")
public class BusProjectMoneyDetailService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("BusProjectMoneyDetailMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("BusProjectMoneyDetailMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("BusProjectMoneyDetailMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("BusProjectMoneyDetailMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("BusProjectMoneyDetailMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("BusProjectMoneyDetailMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("BusProjectMoneyDetailMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 根据项目删除原来的联系人
	 * @param params
	 * @throws Exception
	 */
	public void deleteByProjectId(PageData params) throws Exception {
		dao.delete("BusProjectMoneyDetailMapper.deleteByProjectId",params);
	}
}

