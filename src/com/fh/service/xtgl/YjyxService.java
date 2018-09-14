package com.fh.service.xtgl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.util.DateUtil;
import com.fh.util.PageData;
import com.fh.util.Tools;
import com.fh.util.UuidUtil;
import com.fh.utilmy.CurrentStaff;


@Service("yjyxService")
public class YjyxService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Resource(name="yjyjService")
	private YjyjService yjyjService;
	@Resource(name="staffService")
	private StaffService staffService;
	/*
	* 发送邮件
	*/
	public void savesend(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		String pkid=pd.getString("pk_id");
		String yjid;
		//得到接收用户的姓名
		String jsyhmc="";
		{
			String jsyhid=pd.getString("f_jsyhid");
			String[] jsyhids=jsyhid.split(",");
			for(int i=0;i<jsyhids.length;i++){
				if(!Tools.isEmpty(jsyhids[i])){
					PageData pdUser=staffService.findById(new PageData("staff_id",jsyhids[i]));
					jsyhmc+=pdUser.getString("staff_name")+",";
				}
			}
			if(jsyhmc.length()>0){
				jsyhmc=jsyhmc.substring(0,jsyhmc.length()-1);
			}
		}
		//得到邮件
		PageData pdYj=new PageData();
		if(!Tools.isEmpty(pkid)){
			//修改邮件内容
			PageData pdYx=this.findById(new PageData("pk_id",pkid));
			if(pdYx==null){
				throw new Exception("未查询到邮件信息");
			}
			yjid=pdYx.getString("f_yjid");
			pdYj.put("pk_id", yjid);
			pdYj.put("f_fsyhid", cstaff.getSTAFF_ID());
			pdYj.put("f_jsyhid", pd.getString("f_jsyhid"));
			pdYj.put("f_jsyhmc", jsyhmc);
			pdYj.put("f_bt", pd.getString("f_bt"));			
			pdYj.put("f_nr", pd.getString("f_nr"));			
			yjyjService.edit(pdYj);
			//草稿改到发件箱
			PageData pdYxIn=new PageData();
			pdYxIn.put("pk_id", pkid);
			pdYxIn.put("f_lx", "fjx");
			pdYxIn.put("f_tjsj", DateUtil.getTime());
			this.edit(pdYxIn);
		}else{
			//添加邮件内容
			yjid=pd.getString("f_yjid");
			pdYj.put("pk_id", yjid);
			pdYj.put("f_fsyhid", cstaff.getSTAFF_ID() );
			pdYj.put("f_jsyhid", pd.getString("f_jsyhid"));
			pdYj.put("f_jsyhmc", jsyhmc);
			pdYj.put("f_bt", pd.getString("f_bt"));			
			pdYj.put("f_nr", pd.getString("f_nr"));			
			yjyjService.save(pdYj);
			//添加发件箱
			PageData pdYxIn=new PageData();
			pdYxIn.put("pk_id", UuidUtil.get32UUID());
			pdYxIn.put("f_yhid", cstaff.getSTAFF_ID());
			pdYxIn.put("f_lx", "fjx");
			pdYxIn.put("f_yjid", yjid);
			pdYxIn.put("f_tjsj", DateUtil.getTime());
			this.save(pdYxIn);
		}
		//添加收件箱
		String jsyhid=pd.getString("f_jsyhid");
		String[] jsyhids=jsyhid.split(",");
		for(int i=0;i<jsyhids.length;i++){
			if(!Tools.isEmpty(jsyhids[i])){
				PageData pdYxIn2=new PageData();
				pdYxIn2.put("pk_id", UuidUtil.get32UUID());
				pdYxIn2.put("f_yhid", jsyhids[i]);
				pdYxIn2.put("f_lx", "sjx");
				pdYxIn2.put("f_yjid", yjid);
				pdYxIn2.put("f_tjsj", DateUtil.getTime());
				this.save(pdYxIn2);
			}
		}
	}
	/*
	* 更新已读
	*/
	public void editread(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		if(Tools.isEmpty(pd.getString("pk_id"))){
			throw new Exception("邮件ID不能为空");
		}		
		//save yx read
		PageData pdYxIn=new PageData();
		pdYxIn.put("pk_id", pd.getString("pk_id"));
		pdYxIn.put("f_sfyd", 1);
		this.edit(pdYxIn);
		
	}
	/*
	* 新增 简单
	*/
	public void savesimple(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		if(Tools.isEmpty(pd.getString("f_yjid"))){
			throw new Exception("邮件内容ID不能为空");
		}
		//得到接收用户的姓名
		String jsyhmc="";
		{
			String jsyhid=pd.getString("f_jsyhid");
			String[] jsyhids=jsyhid.split(",");
			for(int i=0;i<jsyhids.length;i++){
				if(!Tools.isEmpty(jsyhids[i])){
					PageData pdUser=staffService.findById(new PageData("staff_id",jsyhids[i]));
					jsyhmc+=pdUser.getString("f_xm")+",";
				}
			}
			if(jsyhmc.length()>0){
				jsyhmc=jsyhmc.substring(0,jsyhmc.length()-1);
			}
		}
		//save yj
		PageData pdYjIn=new PageData();
		pdYjIn.put("pk_id", pd.getString("f_yjid"));
		pdYjIn.put("f_fsyhid", cstaff.getSTAFF_ID());
		pdYjIn.put("f_jsyhid", pd.getString("f_jsyhid"));
		pdYjIn.put("f_jsyhmc", jsyhmc);
		pdYjIn.put("f_bt", pd.getString("f_bt"));			
		pdYjIn.put("f_nr", pd.getString("f_nr"));
		yjyjService.save(pdYjIn);
		//save yx
		PageData pdYxIn=new PageData();
		pdYxIn.put("pk_id", UuidUtil.get32UUID());
		pdYxIn.put("f_yhid", cstaff.getSTAFF_ID());
		pdYxIn.put("f_lx", "cgx");
		pdYxIn.put("f_yjid", pd.getString("f_yjid"));
		pdYxIn.put("f_tjsj", DateUtil.getTime());
		this.save(pdYxIn);
	}
	/*
	* 修改简单
	*/
	public void editsimple(PageData pd)throws Exception{
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		if(Tools.isEmpty(pd.getString("pk_id"))){
			throw new Exception("邮件ID不能为空");
		}
		PageData pdYx=this.findById(new PageData("pk_id",pd.getString("pk_id")));
		if(pdYx==null){
			throw new Exception("未查询到邮件信息");
		}
		//得到接收用户的姓名
		String jsyhmc="";
		{
			String jsyhid=pd.getString("f_jsyhid");
			String[] jsyhids=jsyhid.split(",");
			for(int i=0;i<jsyhids.length;i++){
				if(!Tools.isEmpty(jsyhids[i])){
					PageData pdUser=staffService.findById(new PageData("staff_id",jsyhids[i]));
					jsyhmc+=pdUser.getString("f_xm")+",";
				}
			}
			if(jsyhmc.length()>0){
				jsyhmc=jsyhmc.substring(0,jsyhmc.length()-1);
			}
		}
		String yjid=pdYx.getString("f_yjid");
		PageData pdYj=new PageData();
		pdYj.put("pk_id", yjid);
		pdYj.put("f_jsyhid", pd.getString("f_jsyhid"));
		pdYj.put("f_jsyhmc", jsyhmc);
		pdYj.put("f_bt", pd.getString("f_bt"));			
		pdYj.put("f_nr", pd.getString("f_nr"));			
		yjyjService.edit(pdYj);
	}
	
	/*
	* 新增
	*/
	public void save(PageData pd)throws Exception{
		dao.save("YjyxMapper.save", pd);
	}
	
	/*
	* 删除
	*/
	public void delete(PageData pd)throws Exception{
		dao.delete("YjyxMapper.delete", pd);
	}
	
	/*
	* 修改
	*/
	public void edit(PageData pd)throws Exception{
		dao.update("YjyxMapper.edit", pd);
	}
	
	/*
	*列表
	*/
	public List<PageData> list(Page page)throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		pd.put("session_yhid", cstaff.getSTAFF_ID() );
		return (List<PageData>)dao.findForList("YjyxMapper.datalistPage", page);
	}
	/*
	 *列表删除
	 */
	public List<PageData> listsc(Page page)throws Exception{
		PageData pd=page.getPd();
		CurrentStaff cstaff=(CurrentStaff)pd.get("session_user");
		pd.put("session_yhid", cstaff.getSTAFF_ID() );
		return (List<PageData>)dao.findForList("YjyxMapper.datalistPagesc", page);
	}
	
	/*
	*列表(全部)
	*/
	public List<PageData> listAll(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("YjyxMapper.listAll", pd);
	}
	
	/*
	* 通过id获取数据
	*/
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("YjyxMapper.findById", pd);
	}
	
	/*
	* 批量删除
	*/
	public void deleteAll(String[] ArrayDATA_IDS)throws Exception{
		dao.delete("YjyxMapper.deleteAll", ArrayDATA_IDS);
	}
	
}

