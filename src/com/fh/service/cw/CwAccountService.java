package com.fh.service.cw;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.service.material.basematerialinfo.BaseMaterialInfoService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.Tools;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

/**
 * Created by 11029 on 2018/5/7.
 */
@Service("cwAccountService")
public class CwAccountService {
   


    @Resource(name = "daoSupport")
	private DaoSupport dao;
    /**
     * 1、新增
     */
    public void savesimple(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        if(pd.getString("KAIHU_BANK")==null || pd.getString("KAIHU_BANK").equals("")){
        	throw new Exception("开户行不能为空");
        }
        pd.put("ACCOUNT_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        this.save(pd);
    }
    
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("CwAccountInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("CwAccountInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		if(Tools.isEmpty(pd.getString("ACCOUNT_ID"))){
			throw new Exception("ID不能为空");
		}
		dao.update("CwAccountInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("CwAccountInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("CwAccountInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("CwAccountInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("CwAccountInfoMapper.deleteAll", ArrayDATA_IDS);
	}


	/**
	 * 获取所有的开户行
	 * @param pd
	 * @return
	 */
    public List<PageData> listAllKhh(PageData pd) throws Exception {
    	return (List<PageData>) dao.findForList("CwAccountInfoMapper.listAllKhh",pd);
    }
}
