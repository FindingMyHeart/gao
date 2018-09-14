package com.fh.service.buy.busbuyreturninfo;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.DateUtil;
import com.fh.util.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.List;


@Service("busBuyReturnInfoService")
public class BusBuyReturnInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("BusBuyReturnInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("BusBuyReturnInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("BusBuyReturnInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("BusBuyReturnInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("BusBuyReturnInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("BusBuyReturnInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("BusBuyReturnInfoMapper.deleteAll", ArrayDATA_IDS);
	}

    public String getReturnSn() throws Exception {
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
}

