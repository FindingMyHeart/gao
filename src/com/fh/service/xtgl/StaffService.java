package com.fh.service.xtgl;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.fh.util.*;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.utilmy.CurrentStaff;


@Service("staffService")
public class StaffService {
    public static final int STAFF_LEVEL_COMMON = 0;
    public static final int STAFF_LEVEL_ONE = 1;
    public static final int STAFF_LEVEL_TWO = 2;
    public static final int STAFF_LEVEL_THREE = 3;
    public static final int STAFF_LEVEL_FOUR = 4;
public static final int STAFF_LEVEL_ADMIN = 9;
    
    @Resource(name = "daoSupport")
    private DaoSupport dao;
    /*
	* 生成随机 uuid
	*/
	public PageData getuuid(PageData pd)throws Exception{
		PageData pdRet=new PageData();
		pdRet.put("pk_id", UuidUtil.get32UUID());
		return pdRet;
		
	}
    /*
    * 新增简单
    */
    public void savesimple(PageData pd) throws Exception {
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        if (Tools.isEmpty(pd.getString("login_name"))) {
            throw new Exception("登录名不能为空");
        }
        if (Tools.isEmpty(pd.getString("staff_name"))) {
            throw new Exception("姓名不能为空");
        }

        pd.put("staff_id", UuidUtil.get32UUID());
        pd.put("staff_status", "正常");

        if (!Tools.isEmpty(pd.getString("login_password"))) {
            String login_password = pd.getString("login_password");
            login_password = MD5.md5(login_password);
            pd.put("login_password", login_password);
        }

        List<PageData> list = (List<PageData>) dao.findForList("StaffMapper.findByLoginName", pd);
        if (list != null && list.size() > 0){
            throw new Exception("登录名已存在");
        } else {
            this.save(pd);
        }

    }

    /*
    * 新增
    */
    public void save(PageData pd) throws Exception {
        dao.save("StaffMapper.save", pd);
    }

    /*
    * 删除
    */
    public void delete(PageData pd) throws Exception {
        PageData p = (PageData) dao.findForObject("StaffMapper.findById", pd);
        if (p.get("staff_level").toString().equals("0")
        		||p.get("staff_level").toString().equals("1")
        		||p.get("staff_level").toString().equals("2")
        		||p.get("staff_level").toString().equals("3")){
            dao.delete("StaffMapper.delete", pd);
        } else if (p.get("staff_level").toString().equals("9")){
            throw new Exception("该用户为管理员，不能删除！");
        } else {
            throw new Exception("该用户不能删除！");
        }
    }

    /*
    * 修改
    */
    public void edit(PageData pd) throws Exception {
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        if (!Tools.isEmpty(pd.getString("login_password"))) {
            String login_password = pd.getString("login_password");
            login_password = MD5.md5(login_password);
            pd.put("login_password", login_password);
        }
        pd.put("not_pk_id", pd.getString("staff_id"));
        List<PageData> list = (List<PageData>) dao.findForList("StaffMapper.findByLoginName", pd);
        if (list != null && list.size() > 0){
            throw new Exception("登录名已存在");
        } else {
            dao.update("StaffMapper.edit", pd);
        }
    }


    /*
    *列表
    */
    public List<PageData> list(Page page) throws Exception {
        PageData pd = page.getPd();
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        List<PageData> list = (List<PageData>) dao.findForList("StaffMapper.datalistPage", page);

        return list;
    }

    /*
    *列表(全部)
    */
    public List<PageData> listAll(PageData pd) throws Exception {
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        return (List<PageData>) dao.findForList("StaffMapper.listAll", pd);
    }

    /*
    * 通过id获取数据
    */
    public PageData findById(PageData pd) throws Exception {
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        return (PageData) dao.findForObject("StaffMapper.findById", pd);
    }

    /*
    * 批量删除
    */
    public void deleteAll(String[] ArrayDATA_IDS) throws Exception {
        dao.delete("StaffMapper.deleteAll", ArrayDATA_IDS);
    }

    /*
    * listq
    */
    public List<PageData> listq(PageData pd) throws Exception {
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        return (List<PageData>) dao.findForList("StaffMapper.listq", pd);
    }

    /*
    * 登录判断
    */
    public PageData getUserByNameAndPwd(PageData pd) throws Exception {
        return (PageData) dao.findForObject("StaffMapper.getUserByNameAndPwd", pd);
    }
    /*
     * 得到用户角色
     */
     public List<PageData> getRoleAuth(PageData pd) throws Exception {
         return (List<PageData>) dao.findForList("StaffMapper.listRoleAuth", pd);
     }

    /*
    * 根据token得到用户信息
    */
    public PageData findByToken(PageData pd) throws Exception {
        return (PageData) dao.findForObject("StaffMapper.findByToken", pd);
    }

    /*
    * 更新token
    */
    public PageData updateToken(PageData pd) throws Exception {
        return (PageData) dao.findForObject("StaffMapper.update_token", pd);
    }

    /*
    * 修改密码
    */
    public PageData editpassword(PageData pd) throws Exception {
        CurrentStaff cstaff = (CurrentStaff) pd.get("session_user");
        String login_name = cstaff.getLOGIN_NAME();
        String login_oldpassword = pd.getString("login_oldpassword");
        String login_password = pd.getString("login_password");
        if (login_oldpassword == null || login_oldpassword.length() <= 0) {
            throw new Exception("原密码不能为空");
        }
        if (login_password == null || login_password.length() <= 0) {
            throw new Exception("新密码不能为空");
        }
        login_oldpassword = MD5.md5(login_oldpassword);
        login_password = MD5.md5(login_password);
        //检查old password
        PageData pdSearch = new PageData();
        pdSearch.put("login_name", login_name);
        pdSearch.put("login_password", login_oldpassword);
        PageData pdMember = this.getUserByNameAndPwd(pdSearch);
        if (pdMember == null) {
            throw new Exception("原密码不正确");
        }
        //
        PageData pdIn = new PageData();
        pdIn.put("staff_id", cstaff.getSTAFF_ID());
        pdIn.put("login_password", login_password);
        return (PageData) dao.findForObject("StaffMapper.editpassword", pdIn);
    }

    /*
    * 根据 miandownid 查询 任务和用户信息
	*/
    public List<PageData> findTaskAndUserByMainDownId(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("StaffMapper.findTaskAndUserByMainDownId", pd);
    }

    /*
	* 通过用户id集合获取数据
	*/
    public List<PageData> findByIdList(List staffIdList) throws Exception {
        return (List<PageData>) dao.findForList("StaffMapper.findByIdList", staffIdList);
    }

    public String getApplybuySn() throws Exception {
        String orderNo = "";
        String DATE = DateUtil.getDays();
        String len = "1";
        PageData params = new PageData();
        params.put("date",DateUtil.getDay());
        List<PageData> list = this.listAll(params);
        if(list != null && list.size() > 0){
            len = "" + (list.size()  + 1);
        }
        DecimalFormat df=new DecimalFormat("0000");
        String len_str = df.format(Integer.parseInt(len));
        return DATE + len_str;
    }
}

