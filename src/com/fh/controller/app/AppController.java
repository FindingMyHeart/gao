package com.fh.controller.app;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.fh.entity.Page;
import com.fh.service.xtgl.AppVersionService;
import com.fh.service.xtgl.OperLogService;
import com.fh.service.xtgl.ServiceService;
import com.fh.service.xtgl.StaffService;
import com.fh.util.Const;
import com.fh.util.MD5;
import com.fh.util.PageData;
import com.fh.util.Tools;
import com.fh.util.UuidUtil;
import com.fh.utilmy.BeanToMapUtil;
import com.fh.utilmy.CurrentStaff;
import com.fh.utilmy.DefineServiceConfig;
import com.fh.utilmy.ResultObject;
import com.fh.utilmy.ResultPageObject;
import com.fh.utilmy.SpringContextUtil;

@Controller
@RequestMapping(value = "/app")
public class AppController extends BaseController {
	@Resource(name="staffService")
	private StaffService staffService;
	@Resource(name="operlogService")
	private OperLogService operlogService;
	@Resource(name="serviceService")
	private ServiceService serviceService;
	@Resource(name="appVersionService")
	private AppVersionService appVersionService;

  
    /**
     *
     */
    @RequestMapping(value = "/service")
    @ResponseBody
    public Object service(Page page, HttpServletRequest request) {
        logBefore(logger, "service", request);
        ResultObject ret = new ResultObject();
        PageData pd = this.getPageData();
        String logID = this.get32UUID();
        try {
            //查询服务
            //Map<String,String> paras=this.getRequestParas();
            String methodName = pd.getString("method");
            DefineServiceConfig dsc = serviceService.getServiceConfig(methodName);
            //检查token，并得到用户信息
            String token = pd.getString("token");
            if (Tools.isEmpty(token)) {
                ret.setMsg("登录超时或认证失败");
                ret.setSuccess(9);
                return ret;
            }
            PageData pdIn = new PageData();
            pdIn.put("token", token);
            PageData pdUser = staffService.findByToken(pdIn);
            if (pdUser == null) {
                ret.setMsg("登录超时或认证失败");
                ret.setSuccess(9);
                return ret;
            }
            //得到当前登录用户信息
            CurrentStaff cuser = new CurrentStaff();
            cuser.setSTAFF_ID(pdUser.getString("staff_id"));
            cuser.setLOGIN_NAME(pdUser.getString("login_name"));
            cuser.setSTAFF_NAME(pdUser.getString("staff_name"));
            cuser.setSTAFF_LEVEL(Integer.parseInt(pdUser.get("staff_level").toString()));
            cuser.setSTAFF_STATUS(pdUser.getString("staff_status"));
			cuser.setDEPT_ID(pdUser.getString("dept_id"));
			cuser.setDEPT_NAME(pdUser.getString("dept_name"));

            //记录调用日志
            operlogService.saveLogRecord(logID,cuser,dsc,this.getRequestParasString());
			
			//验证权限
			String currFuncQX=dsc.getAuthCode();
			if(Tools.notEmpty(currFuncQX)){
				//取管理员标志
				int glybz=cuser.getSTAFF_LEVEL();
				if(glybz==0){
					//得到用户全部权限
					String jsqx=","+cuser.getROLE_AUTH();
					if(!jsqx.contains(currFuncQX)){
						throw new Exception("权限不足");
					}
				}else{
					
				}
			}
			
			/*
			cuser.setGlybz(Integer.parseInt(pdUser.get("f_glybz").toString()));
			if(cuser.getGlybz()==1){
				cuser.setJsqx("BMGL_BMTJ,BMGL_BMXG,BMGL_BMLB,BMGL_BMSC,YHGL_YHLB,YHGL_YHTJ,YHGL_YHXG,YHGL_YHSC,GWGL_QJYHCX,");
			}else if(cuser.getGlybz()==2){
				cuser.setJsqx("JSGL_JSLB,JSGL_JSSC,JSGL_JSXG,JSGL_JSTJ,GWGL_QJYHCX,");
			}else if(cuser.getGlybz()==3){
				cuser.setJsqx("CZRZ_CZLB,");
			}*/
            pd.put("session_user", cuser);
            pd.put("sys_real_path", request.getSession().getServletContext().getRealPath("/"));
            //调用服务方法
            //调用服务方法
            Object objResult = null;
            Object serviceObjec = SpringContextUtil.getBean(dsc.getServiceClass());
            java.lang.reflect.Method method = null;
            if (dsc.getServiceInPara().equals("Page")) {
                method = ReflectionUtils.findMethod(serviceObjec.getClass(), dsc.getServiceMethod(), Page.class);
                if (method == null) {
                    throw new Exception("接口不存在");
                }
                //调用service获得返回值
                page.setPd(pd);
                objResult = ReflectionUtils.invokeMethod(method, serviceObjec, page);
            } else if (dsc.getServiceInPara().equals("PageData")) {
                method = ReflectionUtils.findMethod(serviceObjec.getClass(), dsc.getServiceMethod(), PageData.class);
                if (method == null) {
                    throw new Exception("接口不存在");
                }
                //调用service获得返回值
                objResult = ReflectionUtils.invokeMethod(method, serviceObjec, pd);
            }
            //处理返回值
            ret.setSuccess(1);
            //更新操作日志的成功状态
            operlogService.saveUpdateLogStatus(logID, "成功");
            if (objResult != null) {
                if (dsc.getServiceOutPara().equals("PageData")) {
                    ret.setEntity((PageData) objResult);
                } else if (dsc.getServiceOutPara().equals("List")) {
                    ResultPageObject retPage = new ResultPageObject();
                    retPage.setPage(page);
                    retPage.setRows((List) objResult);
                    retPage.setSuccess(1);
                    return retPage;
                } else if (dsc.getServiceOutPara().equals("ListAll")) {
                    ret.setRows((List) objResult);
                    ret.setSuccess(1);
                    return ret;
                } else if (dsc.getServiceOutPara().equals("ComboxList")) {
                    return (List) objResult;
                }
            }

        } catch (InvocationTargetException e) {
            logger.error(e.toString(), e);
            ret.setMsg(e.getCause().getMessage());
        } catch (Exception e) {
            logger.error(e.toString(), e);
            if (e.getCause() != null) {
                ret.setMsg(e.getCause().getMessage());
            } else {
                ret.setMsg(e.toString());
            }
            //更新操作日志的失败状态
            //czjlService.saveUpdateLogStatus(logPKID,"失败");
        } finally {
            logAfter(logger);
        }
        return ret;
    }
    /**
    *
    */
   @RequestMapping(value = "/publicservice")
   @ResponseBody
   public Object publicservice(Page page, HttpServletRequest request) {
       logBefore(logger, "publicservice", request);
       ResultObject ret = new ResultObject();
       PageData pd = this.getPageData();
       String logID = this.get32UUID();
       try {
           //查询服务
           //Map<String,String> paras=this.getRequestParas();
           String methodName = pd.getString("method");
           DefineServiceConfig dsc = serviceService.getServiceConfig(methodName);
         
           //记录调用日志
           operlogService.saveLogRecord(logID,null,dsc,this.getRequestParasString());
           
           pd.put("sys_real_path", request.getSession().getServletContext().getRealPath("/"));
           //调用服务方法
           //调用服务方法
           Object objResult = null;
           Object serviceObjec = SpringContextUtil.getBean(dsc.getServiceClass());
           java.lang.reflect.Method method = null;
           if (dsc.getServiceInPara().equals("Page")) {
               method = ReflectionUtils.findMethod(serviceObjec.getClass(), dsc.getServiceMethod(), Page.class);
               if (method == null) {
                   throw new Exception("接口不存在");
               }
               //调用service获得返回值
               page.setPd(pd);
               objResult = ReflectionUtils.invokeMethod(method, serviceObjec, page);
           } else if (dsc.getServiceInPara().equals("PageData")) {
               method = ReflectionUtils.findMethod(serviceObjec.getClass(), dsc.getServiceMethod(), PageData.class);
               if (method == null) {
                   throw new Exception("接口不存在");
               }
               //调用service获得返回值
               objResult = ReflectionUtils.invokeMethod(method, serviceObjec, pd);
           }
           //处理返回值
           ret.setSuccess(1);
           //更新操作日志的成功状态
           //operlogService.saveUpdateLogStatus(logID, "成功");
           if (objResult != null) {
               if (dsc.getServiceOutPara().equals("PageData")) {
                   ret.setEntity((PageData) objResult);
               } else if (dsc.getServiceOutPara().equals("List")) {
                   ResultPageObject retPage = new ResultPageObject();
                   retPage.setPage(page);
                   retPage.setRows((List) objResult);
                   retPage.setSuccess(1);
                   return retPage;
               } else if (dsc.getServiceOutPara().equals("ListAll")) {
                   ret.setRows((List) objResult);
                   ret.setSuccess(1);
                   return ret;
               } else if (dsc.getServiceOutPara().equals("ComboxList")) {
                   return (List) objResult;
               }
           }

       } catch (InvocationTargetException e) {
           logger.error(e.toString(), e);
           ret.setMsg(e.getCause().getMessage());
       } catch (Exception e) {
           logger.error(e.toString(), e);
           if (e.getCause() != null) {
               ret.setMsg(e.getCause().getMessage());
           } else {
               ret.setMsg(e.toString());
           }
           //更新操作日志的失败状态
           //czjlService.saveUpdateLogStatus(logPKID,"失败");
       } finally {
           logAfter(logger);
       }
       return ret;
   }

    /**
     *
     */

    @RequestMapping(value = "/login")
    @ResponseBody
    public Object login(HttpServletRequest request) {
        logBefore(logger, "login", request);
        PageData pd = this.getPageData();
        ResultObject ret = new ResultObject();
        try {
        	String loginName = pd.getString("login_name");
			String loginPassword = pd.getString("login_password");
			if (Tools.isEmpty(loginName) || Tools.isEmpty(loginPassword)) {
                ret.setMsg("用户名或密码不能为空");
                return ret;
            }
            String loginPasswordMD5 = MD5.md5(loginPassword);
            pd.put("login_password", loginPasswordMD5);
            PageData pdStaff = staffService.getUserByNameAndPwd(pd);
            if (pdStaff == null) {
                ret.setMsg("用户名或密码错误！");
                return ret;
            }
            pdStaff.put("token", UuidUtil.get32UUID());
            staffService.updateToken(pdStaff);
            pdStaff.remove("login_password");
            ret.setSuccess(1);
            ret.setEntity(pdStaff);
        } catch (Exception e) {
            logger.error(e.toString(), e);
            ret.setMsg(e.getMessage());
        } finally {
            logAfter(logger);
        }
        return ret;
    }
    @RequestMapping(value="/findbytoken")
	@ResponseBody
	public Object findbytoken() {
		logBefore(logger, "findbytoken");
		PageData pd = this.getPageData();
        ResultObject ret = new ResultObject();
        try {
        	String token = pd.getString("token");
			if (Tools.isEmpty(token)) {
                ret.setMsg("token不能为空");
                return ret;
            }
            PageData pdStaff = staffService.findByToken(pd);
            if (pdStaff == null) {
                ret.setMsg("查询登录信息失败！");
                return ret;
            }
            ret.setSuccess(1);
            ret.setEntity(pdStaff);
        } catch (Exception e) {
            logger.error(e.toString(), e);
            ret.setMsg(e.getMessage());
        } finally {
            logAfter(logger);
        }
		return ret;
	}
    @RequestMapping(value="/getversion")
	@ResponseBody
	public Object getVersion(HttpServletRequest request){
		logBefore(logger, "getVersion",request);
		ResultObject ret = new ResultObject();
		PageData pd = this.getPageData();
		//
		try{
			List<PageData> rows=appVersionService.listQuery(pd);
			if(rows.size()>0){
				ret.setEntity(rows.get(0));
				ret.setSuccess(1);
			}
		} catch(Exception e){
			logger.error(e.toString(), e);
			ret.setMsg(e.getMessage());
		}
		return ret;	
	}
    /**
     * 文件上传
     */
	/*
	@RequestMapping(value = "/uploadpostfile")
	@ResponseBody
	public Object uploadpostfile(HttpServletRequest request,MultipartFile uploadfile) throws Exception {
		logBefore(logger, "uploadpostfile",request);
		ResultObject ret = new ResultObject();
		PageData pd = new PageData(request);
		//检查token，并得到用户信息
		String token=pd.getString("TOKEN");
		if(Tools.isEmpty(token)){
			ret.setMsg("身份验证异常！");
			ret.setSuccess(9);
			return ret;
		}
		PageData pdIn=new PageData();
		pdIn.put("TOKEN", token);
		PageData pdUser=staffService.findByToken(pdIn);
		if(pdUser==null){
			ret.setMsg("身份验证异常！");
			ret.setSuccess(9);
			return ret;
		}
		//
		PageData pdGwfj = new PageData();
		pdGwfj.put("fk_id", pd.getString("fk_id"));	
		pdGwfj.put("f_bh", pd.getString("f_bh"));
		pdGwfj.put("f_lx", pd.getString("f_lx"));
		if(Tools.isEmpty(pd.getString("pk_id"))){
			pdGwfj.put("pk_id", this.get32UUID());	//主键
			pdGwfj.put("f_tjyhid", pdUser.getString("pk_id"));
			pdGwfj.put("f_tjsj", DateUtil.getTime());	
		}else{
			pdGwfj.put("pk_id",pd.getString("pk_id"));	//主键
		}
		
		//image
		String pk_id= this.get32UUID();
		String f_lx=pd.getString("f_lx");
		String relativePath="/static/file/"+f_lx+"/";
		String realPath = request.getSession().getServletContext().getRealPath(relativePath);
		if(uploadfile!=null && !uploadfile.isEmpty()){
			String originalname=uploadfile.getOriginalFilename();
			String extname=originalname.substring(originalname.lastIndexOf("."));
			System.out.println(realPath);
			String filename=DateUtil.getTime2()+extname;
			FileUtils.copyInputStreamToFile(uploadfile.getInputStream(), new File(
					realPath, filename));
			pdGwfj.put("f_wjlj", relativePath+filename);
			pdGwfj.put("f_wjmc", filename);
			
		}else{
			ret.setMsg("未接收到文件");
			return ret;
		}
		if(Tools.isEmpty(pd.getString("pk_id"))){
			gwfjService.save(pdGwfj);
		}else{
			gwfjService.edit(pdGwfj);
		}
		ret.setSuccess(1);
		return ret;
	}
	*/

    
    /**
     * 得到文件
     */
    @RequestMapping(value = "/getfile")
    public void getImage(HttpServletRequest request, HttpServletResponse response) {
        logBefore(logger, "getfile", request);

        FileInputStream fis = null;
        response.setContentType("image/gif");
        try {
            PageData pd = this.getPageData();
            String path = pd.getString("path");

            OutputStream out = response.getOutputStream();

            File file = new File(request.getSession().getServletContext().getRealPath("/")
                    + File.separator + path);
            fis = new FileInputStream(file);
            byte[] b = new byte[fis.available()];
            fis.read(b);
            out.write(b);
            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

   
}
