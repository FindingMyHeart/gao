package com.fh.service.xtgl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.DateUtil;
import com.fh.util.PageData;
import com.fh.utilmy.CurrentStaff;
import com.fh.utilmy.DefineServiceConfig;
import com.fh.utilmy.MemberInfo;


@Service("operlogService")
public class OperLogService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	public void saveLogRecord(String logID,CurrentStaff memeber, DefineServiceConfig dsc, String paras){
		try{
			PageData pdCZJL=new PageData();
			pdCZJL.put("operlog_id", logID);
			if(memeber!=null){
				pdCZJL.put("create_userid", memeber.getSTAFF_ID());
				pdCZJL.put("create_username", memeber.getSTAFF_NAME());
			}
			pdCZJL.put("create_time", new Date());
			pdCZJL.put("update_time", new Date());
			pdCZJL.put("oper_module",dsc.getModuleName());
			pdCZJL.put("oper_func", dsc.getFuncName());
			pdCZJL.put("oper_para", paras);   //传递的参数串，
			pdCZJL.put("log_status", "调用");
			this.save(pdCZJL);
		}catch(Exception ex){
			//log
			String cc=ex.getMessage();
			System.out.print(cc);
		}
	}
	
	public void saveUpdateLogStatus(String logPKID,String status){
		try{
			PageData pdCZJLUpdate=new PageData();
			pdCZJLUpdate.put("operlog_id", logPKID);
			pdCZJLUpdate.put("update_time", new Date());
			pdCZJLUpdate.put("log_status", status);
			this.edit(pdCZJLUpdate);
		}catch(Exception ex){
			//log
			String cc=ex.getMessage();
			System.out.print(cc);
		}
	}
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("OperLogMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("OperLogMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("OperLogMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("OperLogMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("OperLogMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("OperLogMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("OperLogMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

