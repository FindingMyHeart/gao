package com.fh.service.buy.busbuydetail;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("busbuydetailService")
public class BusBuyDetailService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("BusBuyDetailMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("BusBuyDetailMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("BusBuyDetailMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("BusBuyDetailMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("BusBuyDetailMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("BusBuyDetailMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("BusBuyDetailMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 根据所属主表ID进行删除
	 */
	public void deleteByBuyId(PageData pd) throws Exception {
		dao.delete("BusBuyDetailMapper.deleteByBuyId",pd);
	}

	/**
	 * 物料采购列表
	 * @param page
	 * @return
	 */
	public List<PageData> materiallistPage(Page page) throws Exception {
		return (List<PageData>) dao.findForList("BusBuyDetailMapper.materiallistPage",page);
	}
}

