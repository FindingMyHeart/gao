package com.fh.service.xtgl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import com.fh.utilmy.DefineServiceConfig;


@Service("serviceService")
public class ServiceService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	public DefineServiceConfig getServiceConfig(String key)throws Exception{
		DefineServiceConfig ret=new DefineServiceConfig();
		PageData pd=new PageData();
		pd.put("service_key", key);
		List<PageData> pdlist=this.listAll(pd);
		if(pdlist.size()!=1){
			throw new Exception("不能查找到方法");
		}
		PageData pdResult=pdlist.get(0);
		ret.setServiceKey(pdResult.getString("service_key"));
		ret.setServiceMethod(pdResult.getString("service_method"));
		ret.setServiceClass(pdResult.getString("service_class"));
		ret.setServiceInPara(pdResult.getString("service_inpara"));
		ret.setServiceOutPara(pdResult.getString("service_outpara"));
		ret.setAuthCode(pdResult.getString("auth_code"));
		ret.setModuleName(pdResult.getString("module_name"));
		ret.setFuncName(pdResult.getString("func_name"));
		return ret;
	}
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("ServiceMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("ServiceMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("ServiceMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("ServiceMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("ServiceMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("ServiceMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("ServiceMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

