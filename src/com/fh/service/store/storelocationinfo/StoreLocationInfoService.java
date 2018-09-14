package com.fh.service.store.storelocationinfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("storelocationinfoService")
public class StoreLocationInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("StoreLocationInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("StoreLocationInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("StoreLocationInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("StoreLocationInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("StoreLocationInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("StoreLocationInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("StoreLocationInfoMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 获取所有库位名称的列表（下拉列表）
	 * @param pd
	 * @return
	 */
	public List<PageData> getAllKwglList(PageData pd) {
		List<PageData> list = new ArrayList<PageData>();
		try {
			list = this.listAll(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return  list;
	}
}

