package com.fh.service.adm.admcertlend;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("admcertlendService")
public class AdmCertLendService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("AdmCertLendMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("AdmCertLendMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("AdmCertLendMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("AdmCertLendMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("AdmCertLendMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("AdmCertLendMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("AdmCertLendMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 修改状态
	 */
	public void updateStatus(PageData pd)throws Exception{
		dao.update("AdmCertLendMapper.updateStatus",pd);
	}

	/**
	 * 修改在借状态
	 * @param pd
	 */
    public void updateZjStatus(PageData pd) throws Exception {
		dao.update("AdmCertLendMapper.updateZjStatus",pd);
    }
}

