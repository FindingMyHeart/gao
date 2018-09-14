package com.fh.service.adm.admcontractinfo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("admcontractinfoService")
public class AdmContractInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("AdmContractInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("AdmContractInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("AdmContractInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("AdmContractInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("AdmContractInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("AdmContractInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("AdmContractInfoMapper.deleteAll", ArrayDATA_IDS);
	}

    public void updateUseCase(PageData pd) throws Exception {
		dao.update("AdmContractInfoMapper.updateUseCase",pd);
    }
}

