package com.fh.service.store.storestatusinfo;

import java.util.List;

import javax.annotation.Resource;

import com.fh.service.material.MaterialService;
import com.fh.service.material.basematerialinfo.BaseMaterialInfoService;
import com.fh.service.store.storelocationinfo.StoreLocationInfoService;
import com.fh.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.PageData;


@Service("storestatusinfoService")
public class StoreStatusInfoService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Autowired
	private BaseMaterialInfoService baseMaterialInfoService;

	@Autowired
	private StoreLocationInfoService storeLocationInfoService;
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("StoreStatusInfoMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("StoreStatusInfoMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("StoreStatusInfoMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		return (List<PageData>)dao.findForList("StoreStatusInfoMapper.datalistPage", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("StoreStatusInfoMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("StoreStatusInfoMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("StoreStatusInfoMapper.deleteAll", ArrayDATA_IDS);
	}

	/**
	 * 根据产品ID 和 库位ID查找库存信息
	 */
	public PageData findByMaterialAndLocation(PageData pd) throws Exception {
		return (PageData) dao.findForObject("StoreStatusInfoMapper.findByMaterialAndLocation",pd);
	}

	/**
	 * 增加库存
	 * @param params
	 */
	private void addNum(PageData params) throws Exception {
		dao.update("StoreStatusInfoMapper.addNum",params);
	}

	/**
	 * 减少库存
	 * @param params
	 */
	private void reduceNum(PageData params) throws Exception {
		dao.update("StoreStatusInfoMapper.reduceNum",params);
	}
	/**
	 * 修改库存
	 * @param material_id
	 * @param material_num
	 * @param location_id
	 * @param io_type
	 */
	public void editKc(String material_id, Integer material_num, String location_id, String io_type) throws Exception {
		PageData params = new PageData();
		if(!io_type.equals("1") && !io_type.equals("2")){
			throw new Exception("错误的库存变化类型！");
		}
		//查看是否存在
		params = new PageData();
		params.put("MATERIAL_ID",material_id);
		params.put("LOCATION_ID",location_id);
		PageData kc = this.findByMaterialAndLocation(params);

		if(io_type.equals("1")){
			//没有保存过，保存
			if(kc == null || kc.get("STATUS_ID") == null){
				params = new PageData();
				params.put("STATUS_ID", UuidUtil.get32UUID());
				params.put("MATERIAL_ID",material_id);
				params.put("LOCATION_ID",location_id);
				params.put("MATERIAL_NUM",material_num);
				this.save(params);
			}else {
				params = new PageData();
				params.put("STATUS_ID", kc.get("STATUS_ID"));
				params.put("CHANGE_NUM",material_num);
				this.addNum(params);
			}
		}else if(io_type.equals("2")){
			if(kc == null || kc.get("STATUS_ID") == null || kc.get("MATERIAL_NUM") == null || Integer.valueOf( kc.get("MATERIAL_NUM").toString()) < material_num){
				String MATERIAL_NAME = "";
				String LOCATION_NAME = "";
				params = new PageData();
				params.put("MATERIAL_ID",material_id);
				PageData material = baseMaterialInfoService.findById(params);
				if(material != null && material.get("MATERIAL_NAME") != null && !material.get("MATERIAL_NAME").toString().equals("")){
					MATERIAL_NAME = material.getString("MATERIAL_NAME");
				}
				params = new PageData();
				params.put("LOCATION_ID",location_id);
				PageData location = storeLocationInfoService.findById(params);
				if(location != null && location.get("LOCATION_NAME") != null && !location.get("LOCATION_NAME").toString().equals("")){
					LOCATION_NAME = location.getString("LOCATION_NAME");
				}

				String NOW_NUM = "0";
				if(kc != null && kc.get("MATERIAL_NUM") != null && !kc.get("MATERIAL_NUM").toString().equals("")){
					NOW_NUM = kc.get("MATERIAL_NUM").toString();
				}
				throw new Exception("库存不足！库位： "+LOCATION_NAME + " 上的 "+MATERIAL_NAME+" 的现有库存为" + NOW_NUM);
			}else{
				params = new PageData();
				params.put("STATUS_ID", kc.get("STATUS_ID"));
				params.put("CHANGE_NUM",material_num);
				this.reduceNum(params);
			}
		}
	}
}

