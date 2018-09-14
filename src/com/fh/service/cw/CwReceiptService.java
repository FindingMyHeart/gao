package com.fh.service.cw;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.Tools;
import com.fh.util.UuidUtil;
import com.fh.utilmy.CurrentStaff;

@Service("cwReceiptService")
public class CwReceiptService {
	
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
        
        pd.put("RECEIPT_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("STATUS", "新建");
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        this.save(pd);
    }
    public void savecheck(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        if(Tools.isEmpty(pd.getString("RECEIPT_ID"))){
			throw new Exception("ID不能为空");
		}
        pd.put("CHECK_TIME", DateUtil.getTime());
        pd.put("CHECK_USERID", staff.getSTAFF_ID());
        dao.save("CwReceiptInfoMapper.check", pd);
    }
    
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("CwReceiptInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("CwReceiptInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		if(Tools.isEmpty(pd.getString("RECEIPT_ID"))){
			throw new Exception("ID不能为空");
		}
		dao.update("CwReceiptInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("CwReceiptInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("CwReceiptInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("CwReceiptInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("CwReceiptInfoMapper.deleteAll", ArrayDATA_IDS);
	}

}
