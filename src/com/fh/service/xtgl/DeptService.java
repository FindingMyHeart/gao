package com.fh.service.xtgl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.fh.util.DateUtil;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.utilmy.CurrentStaff;


@Service("deptService")
public class DeptService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	/*
	* 新增简单
	*/
	public void savesimple(PageData pd)throws Exception{
		this.save(pd);
	}
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		String dept_id  = UuidUtil.get32UUID();

		pd.put("dept_id", dept_id);
		pd.put("create_time" , DateUtil.getTime());
		//校验
		//部门编号不能为空
		if(pd.getString("dept_code") == null || pd.getString("dept_code").equals("")){
			throw new RuntimeException("部门编号不能为空！");
		}
		String dept_code = pd.getString("dept_code");
		//验证部门编号是否重复
		Boolean hasDeptCode  = this.findIsHasDeptByDeptCode(dept_code,dept_id);
		if(hasDeptCode){
			throw new RuntimeException("该部门编号已存在，请更换一个部门编码！");
		}
		dao.save("DeptMapper.save", pd);
	}
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		if(pd.getString("dept_id") == null || pd.getString("dept_id").equals("")){
			throw new RuntimeException("单位主键ID不能为空！");
		}
		String dept_id = pd.getString("dept_id");
		//校验
		//部门编号不能为空
		if(pd.getString("dept_code") == null || pd.getString("dept_code").equals("")){
			throw new RuntimeException("单位编号不能为空！");
		}
		String dept_code = pd.getString("dept_code");
		//验证部门编号是否重复
		Boolean hasDeptCode  = this.findIsHasDeptByDeptCode(dept_code,dept_id);
		if(hasDeptCode){
			throw new RuntimeException("该单位编号已存在，请更换一个单位编号！");
		}
		dao.update("DeptMapper.edit", pd);
	}
	/**
	 * 判断已经存在了该部门编号
	 * @param dept_code  部门编号
	 * @param dept_id  部门主键id
	 * @return  如果已经存在了，返回true, 如果没有存在，返回false;
	 */
	private Boolean findIsHasDeptByDeptCode(String dept_code,String dept_id) throws Exception {

		PageData pd = new PageData();
		pd.put("dept_code" , dept_code);
		pd.put("dept_id" , dept_id);

		pd = (PageData) dao.findForObject("DeptMapper.findIsHasDeptByDeptCode",pd);

		if(pd != null){
			return true;
		}
		return false;
	}
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		dao.delete("DeptMapper.delete", pd);
	}



	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("DeptMapper.datalistPage", page);
	}
	
	public List<PageData> listforres(Page page) throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("DeptMapper.datalistPageForRes", page);
		
	}

	/*
	*列表(q)
	*/
	public List<PageData> listq(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		List<PageData> list = (List<PageData>)dao.findForList("DeptMapper.listq", pd);

		return list;
	}
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (List<PageData>)dao.findForList("DeptMapper.listAll", pd);
	}

	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		return (PageData)dao.findForObject("DeptMapper.findById", pd);
	}

	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("DeptMapper.deleteAll", ArrayDATA_IDS);
	}


	/**
	 *  获取部门树（用于 ztree）
	 */
	public List<PageData> findDeptTree(PageData pd) throws Exception {

		List<PageData> list  = (List<PageData>) dao.findForList("DeptMapper.findDeptTree",pd);
		for(PageData temp : list){
			temp.put("name" , temp.get("dept_name"));
			temp.put("id" , temp.get("dept_id"));
			temp.put("pId" , temp.get("pid"));
		}
		return list;
	}

	/**
	 * 获取该审核树的根目录
	 * @param pd
	 * @return
	 */
    public List<PageData> listRoot(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("DeptMapper.listRoot",pd);
    }
}

