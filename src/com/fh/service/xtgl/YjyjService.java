package com.fh.service.xtgl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;


@Service("yjyjService")
public class YjyjService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增 简单
	*/
	public void savesimple(PageData pd)throws Exception{
		pd.put("pk_id", UuidUtil.get32UUID());
		this.save(pd);
	}
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("YjyjMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("YjyjMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("YjyjMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("YjyjMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("YjyjMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("YjyjMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("YjyjMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

