package com.fh.service.cw.basecwfeeapplyinfo;

import java.text.DecimalFormat;
import java.util.List;

import javax.annotation.Resource;

import com.fh.util.DateUtil;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("basecwfeeapplyinfoService")
public class BaseCwFeeApplyInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("BaseCwFeeApplyInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("BaseCwFeeApplyInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("BaseCwFeeApplyInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("BaseCwFeeApplyInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("BaseCwFeeApplyInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("BaseCwFeeApplyInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("BaseCwFeeApplyInfoMapper.deleteAll", ArrayDATA_IDS);
	}

	public String getApplybuySn() throws Exception {
		String orderNo = "";
		String DATE = DateUtil.getDays();
		String len = "1";
		PageData params = new PageData();
		params.put("DATE",DateUtil.getDay());
		List<PageData> list = this.listAll(params);
		if(list != null && list.size() > 0){
			len = "" + (list.size()  + 1);
		}
		DecimalFormat df=new DecimalFormat("0000");
		String len_str = df.format(Integer.parseInt(len));
		return DATE + len_str;
	}

	/**
	 * 修改状态
	 * @param pd
	 */
	public void updateStatus(PageData pd) throws Exception {
		dao.update("BaseCwFeeApplyInfoMapper.updateStatus",pd);
	}

	public void addInfo(PageData pd) throws Exception {
		dao.update("BaseCwFeeApplyInfoMapper.addInfo",pd);
	}

	//完成
	public void complete(PageData pd) throws Exception {
		dao.update("BaseCwFeeApplyInfoMapper.complete",pd);
	}
}

