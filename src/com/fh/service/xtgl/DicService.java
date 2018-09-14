package com.fh.service.xtgl;

import java.util.List;

import javax.annotation.Resource;

import com.fh.util.UuidUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("dicService")
public class DicService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增简单
	*/
	public void savesimple(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		pd.put("dic_id", UuidUtil.get32UUID());
		this.save(pd);
	}

	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		PageData pd1 = new PageData();
		if (pd.getString("dic_group").equals("0")){
			pd1.put("dic_group", "1");
			pd1.put("dic_type", pd.get("dic_type"));
		} else if (pd.getString("dic_group").equals("1")){
			pd1.put("dic_group", "0");
			pd1.put("dic_type", pd.get("dic_type"));
		}
		List<PageData> list = (List<PageData>) dao.findForList("DicMapper.checkDicType", pd1);
		if (list != null && list.size() != 0 && pd.getString("dic_group").equals("0")){
			throw new Exception("用户字典中已存在此类型");
		} else if (list != null && list.size() != 0 && pd.getString("dic_group").equals("1")){
			throw new Exception("系统字典中已存在此类型");
		} else {
			dao.save("DicMapper.save", pd);
		}
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		dao.delete("DicMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");

		PageData pd1 = new PageData();
		if (pd.getString("dic_group").equals("0")){
			pd1.put("dic_group", "1");
			pd1.put("dic_type", pd.get("dic_type"));
		} else if (pd.getString("dic_group").equals("1")){
			pd1.put("dic_group", "0");
			pd1.put("dic_type", pd.get("dic_type"));
		}
		List<PageData> list = (List<PageData>) dao.findForList("DicMapper.checkDicType", pd1);
		if (list != null && list.size() != 0 && pd.getString("dic_group").equals("0")){
			throw new Exception("用户字典中已存在此类型");
		} else if (list != null && list.size() != 0 && pd.getString("dic_group").equals("1")){
			throw new Exception("系统字典中已存在此类型");
		} else {
			dao.update("DicMapper.edit", pd);
		}

	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("DicMapper.datalistPage", page);
	}

	public List<PageData> listByType(PageData data) throws Exception {
		return (List<PageData>)dao.findForList("DicMapper.listByType",data);
	}

	/**
	 * 获取字典
	 * @return
	 * @throws Exception
	 */
	public List<PageData> getRootDic() throws Exception {
		return (List<PageData>)dao.findForList("DicMapper.getRootDic", null);
	}


	/*
	*列表(q)
	*/
	public List<PageData> listq(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("DicMapper.listq", pd);
	}

	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("DicMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (PageData)dao.findForObject("DicMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("DicMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

