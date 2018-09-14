package com.fh.service.xtgl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.fh.entity.system.Menu;
import com.fh.entity.system.User;
import com.fh.util.Const;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import com.fh.utilmy.CurrentStaff;


@Service("authService")
public class AuthService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增简单
	*/
	public void savesimple(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		this.save(pd);
	}
	/*
	* 修改简单
	*/
	public void editsimple(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		dao.update("AuthMapper.edit", pd);
	}
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("AuthMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		dao.delete("AuthMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("AuthMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		List<PageData> list = (List<PageData>)dao.findForList("AuthMapper.datalistPage", page);
		List<PageData> list_type = (List<PageData>)dao.findForList("AuthMapper.datalistType", page);
		List<PageData> list2 = new ArrayList<PageData>();
		for (int i = 0; i < list_type.size(); i++){
			PageData map = new PageData();
			List<PageData> list1 = new ArrayList<PageData>();
			for (int j = 0; j < list.size(); j++){
				if (list.get(j).getString("auth_type").equals(list_type.get(i).getString("auth_type"))){
					list1.add(list.get(j));
				}
			}
			map.put("key", list_type.get(i).getString("auth_type"));
			map.put("value", list1);
			list2.add(map);
		}
		return list2;
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("AuthMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (PageData)dao.findForObject("AuthMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("AuthMapper.deleteAll", ArrayDATA_IDS);
	}

	/*
	* 获取当前登录用户的所有权限
	*/
	public PageData getAuth(PageData pd)throws Exception{
		PageData pd1 = (PageData) dao.findForObject("CaidanMapper.roleId", pd);
		if (pd1 != null){
			String[] strs = pd1.getString("role_id").split(",");
			List<PageData> authlist = new ArrayList<PageData>();
			for (int i = 0; i< strs.length; i++){
				pd.put("role_id", strs[i]);
				PageData roleAuth = (PageData) dao.findForObject("CaidanMapper.roleAuth", pd);
				authlist.add(roleAuth);
			}

			String ROLE_AUTH = "";
			for (int i = 0; i< authlist.size(); i++){
				if (i == 0){
					ROLE_AUTH += authlist.get(i).get("role_auth");
				} else {
					ROLE_AUTH += "," + authlist.get(i).get("role_auth");
				}
			}
			pd.put("role_auth", ROLE_AUTH);
			return pd;
		} else {
			return null;
		}
	}

	/**
	 * 清空数据
	 */
    public void clear() throws Exception {
		dao.delete("AuthMapper.clear",null);
    }
}

