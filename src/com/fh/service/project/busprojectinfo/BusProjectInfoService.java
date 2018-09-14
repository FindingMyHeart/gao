package com.fh.service.project.busprojectinfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("busprojectinfoService")
public class BusProjectInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("BusProjectInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("BusProjectInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("BusProjectInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("BusProjectInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("BusProjectInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("BusProjectInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("BusProjectInfoMapper.deleteAll", ArrayDATA_IDS);
	}

	public List<PageData> getAllProjectList(PageData pd) {
		List<PageData> list = new ArrayList<PageData>();
		try {
			list = this.listAll(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 修改状态
	 * @param pd
	 */
    public void updateStatus(PageData pd) throws Exception {
    	dao.update("BusProjectInfoMapper.updateStatus",pd);
    }

    public List<PageData> yskdList(Page page) throws Exception {
    	return (List<PageData>) dao.findForList("BusProjectInfoMapper.yskdlistPage",page);
    }

	/**
	 * 获取详细的应收款单
	 */
	public PageData findForYskd(PageData pd) throws Exception {
		return (PageData) dao.findForObject("BusProjectInfoMapper.findForYskd",pd);
	}

	/**
	 * 添加信息
	 * @param pd
	 */
    public void addInfo(PageData pd) throws Exception {
    	dao.update("BusProjectInfoMapper.addInfo",pd);
    }

	/**
	 * 完成
	 * @param pd
	 */
	public void complete(PageData pd) throws Exception {
		dao.update("BusProjectInfoMapper.complete",pd);
	}

	/**
	 * 转入售后
	 * @param pd
	 */
    public void toSh(PageData pd) throws Exception {
    	dao.update("BusProjectInfoMapper.toSh",pd);
    }
}

