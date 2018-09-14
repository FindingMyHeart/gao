package com.fh.service.afterSale.shrepairpersonnel;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("shrepairpersonnelService")
public class ShRepairPersonnelService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("ShRepairPersonnelMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("ShRepairPersonnelMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("ShRepairPersonnelMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("ShRepairPersonnelMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("ShRepairPersonnelMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("ShRepairPersonnelMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("ShRepairPersonnelMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 按维修单的主键ID删除联系人
	 */
	public void deleteByRepairId(PageData pd) throws Exception {
		dao.delete("ShRepairPersonnelMapper.deleteByRepairId",pd);
	}

	/**
	 * 获取维修人员
	 * @param REPAIR_ID
	 * @return
	 */
    public String getPersonnelNames(String REPAIR_ID) throws Exception {
    	return (String) dao.findForObject("ShRepairPersonnelMapper.getPersonnelNames",REPAIR_ID);
    }
    
	/***
	 *  获取维修人员列表
	 * @param pd
	 * @return
	 */
	public List<PageData> listWxry(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ShRepairPersonnelMapper.listWxry",pd);
	}
}

