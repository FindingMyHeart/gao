package com.fh.service.buy.busbuyreturndetail;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service("busBuyReturnDetailService")
public class BusBuyReturnDetailService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("BusBuyReturnDetailMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("BusBuyReturnDetailMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("BusBuyReturnDetailMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("BusBuyReturnDetailMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("BusBuyReturnDetailMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("BusBuyReturnDetailMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("BusBuyReturnDetailMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 根据所属主表ID进行删除
	 */
	public void deleteByReturnyId(PageData pd) throws Exception {
		dao.delete("BusBuyReturnDetailMapper.deleteByReturnyId",pd);
	}

	/**
	 * 物料列表
	 * @param page
	 * @return
	 */
	public List<PageData> materiallistPage(Page page) throws Exception {
		return (List<PageData>) dao.findForList("BusBuyReturnDetailMapper.materiallistPage",page);
	}
}

