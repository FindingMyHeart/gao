package com.fh.service.xtgl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import com.fh.util.Tools;
import com.fh.util.UuidUtil;


@Service("xtroleService")
public class XtRoleService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增 简单
	*/
	public void savesimple(PageData pd)throws Exception{
		if(Tools.isEmpty(pd.getString("role_name"))){
			throw new Exception("角色名称不能为空");
		}
		PageData pdIn=new PageData();
		pdIn.put("role_name", pd.getString("role_name"));
		List<PageData> list=this.listAll(pdIn);
		if(list.size()>0){
			throw new Exception("角色名称不能重复");
		}
		pd.put("role_id", UuidUtil.get32UUID());
		this.save(pd);
	}
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("XtRoleMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("XtRoleMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		if(Tools.isEmpty(pd.getString("role_id"))){
			throw new Exception("ID不能为空");
		}
		PageData pdIn=new PageData();
		pdIn.put("role_name", pd.getString("role_name"));
		pdIn.put("not_pk_id", pd.getString("role_id"));
		List<PageData> list=this.listAll(pdIn);
		if(list.size()>0){
			throw new Exception("角色名称不能重复");
		}
		dao.update("XtRoleMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("XtRoleMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XtRoleMapper.listAll", pd);
	}
	/*
	*列表(q)
	*/
	public List<PageData> listq(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XtRoleMapper.listq", pd);
	}
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("XtRoleMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("XtRoleMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

