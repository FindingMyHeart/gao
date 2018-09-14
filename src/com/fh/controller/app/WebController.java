package com.fh.controller.app;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.fh.utilmy.*;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fh.util.*;
import org.apache.http.client.methods.HttpGet;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.fh.entity.Page;
import com.fh.entity.layui.LayuiResult;
import com.fh.service.xtgl.CaidanService;
import com.fh.service.xtgl.OperLogService;
import com.fh.service.xtgl.ServiceService;
import com.fh.service.xtgl.StaffService;
import com.fh.utilmy.TreeBuilder.Node;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping(value="/web")
public class WebController extends BaseController {
	
	@Resource(name="staffService")
	private StaffService staffService;
	@Resource(name="operlogService")
	private OperLogService operlogService;
	@Resource(name="serviceService")
	private ServiceService serviceService;
	@Resource(name="caidanService")
	private CaidanService caidanService;
	/**
	 * 
	 */
	@RequestMapping(value="/service")
	@ResponseBody
	public Object service(Page page, HttpServletRequest request) {
		logBefore(logger, "service",request);		
		ResultObject ret = new ResultObject();
		PageData pd=this.getPageData();
		String logID =this.get32UUID();
		try {
			//查询服务
			//Map<String,String> paras=this.getRequestParas();
			String methodName=pd.getString("METHOD");
			DefineServiceConfig dsc=serviceService.getServiceConfig(methodName);
			//检查session，并得到用户信息
			Subject currentUser = SecurityUtils.getSubject();  
			Session session = currentUser.getSession();
			CurrentStaff cuser =(CurrentStaff)session.getAttribute(Const.SESSION_USER);
				String flag = "";
			if(pd.get("FLAG") != null && pd.get("FLAG").toString() != null && !pd.get("FLAG").toString().equals("")){
				flag = pd.get("FLAG").toString();
			}
			if(!"a".equals(flag)){
				if (cuser == null) {
					ret.setMsg("登录超时或认证失败");
					ret.setSuccess(9);
					return ret;
				}
			}
//			if(cuser==null){
//				ret.setMsg("登录超时或认证失败");
//				ret.setSuccess(9);
//				return ret;
//			}
			//记录调用日志
			operlogService.saveLogRecord(logID,cuser,dsc,this.getRequestParasString());
			
			//验证权限
			String currFuncQX=dsc.getAuthCode();
			if(Tools.notEmpty(currFuncQX) && !"a".equals(flag)){
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
			
			//得到当前登录用户信息
			pd.put("session_user", cuser);
			pd.put("sys_real_path", request.getSession().getServletContext().getRealPath("/") );
			//调用服务方法
			Object objResult=null;
			Object serviceObjec = SpringContextUtil.getBean(dsc.getServiceClass());
			java.lang.reflect.Method method =null;
			if(dsc.getServiceInPara().equals("Page")){
				method = ReflectionUtils.findMethod(serviceObjec.getClass(), dsc.getServiceMethod(),Page.class);
				if(method==null){
					throw new Exception("接口不存在");
				}
				//调用service获得返回值
				page.setPd(pd);
				objResult = ReflectionUtils.invokeMethod(method, serviceObjec, page);
			}else if(dsc.getServiceInPara().equals("PageData")){
				method = ReflectionUtils.findMethod(serviceObjec.getClass(), dsc.getServiceMethod(),PageData.class);
				if(method==null){
					throw new Exception("接口不存在");
				}
				//调用service获得返回值
				objResult = ReflectionUtils.invokeMethod(method, serviceObjec, pd);
			}
			//处理返回值
			ret.setSuccess(1);
			//更新操作日志的成功状态
			operlogService.saveUpdateLogStatus(logID,"成功");
			if(objResult!=null)
			{
				if(dsc.getServiceOutPara().equals("PageData")){
					ret.setEntity((PageData)objResult);
				}else if(dsc.getServiceOutPara().equals("List")){
					ResultPageObject retPage=new ResultPageObject();
					retPage.setPage(page);
					retPage.setRows((List)objResult);
					retPage.setSuccess(1);
					return retPage;
				}else if(dsc.getServiceOutPara().equals("ListAll")){
					ret.setRows((List)objResult);
					ret.setSuccess(1);
					return ret;
				}else if(dsc.getServiceOutPara().equals("ComboxList")){
					return (List)objResult;
				}else if (dsc.getServiceOutPara().equals("LayList")) {
					LayuiResult layuiResult = new LayuiResult();
					GetDatalayui.getLData(layuiResult,page, (List) objResult);
					return layuiResult;
				}
			}
		}catch (InvocationTargetException e) {
            logger.error(e.toString(), e);
            ret.setMsg(e.getCause().getMessage());
        } catch (Exception e) {
			logger.error(e.toString(), e); 
			if(e.getCause()!=null){
				ret.setMsg(e.getCause().getMessage());
			}else{
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
	 * 跳转指定页面
	 */
	@RequestMapping("toUrl")
	public ModelAndView toUrl(){
		ModelAndView mv = this.getModelAndView();
		PageData pd = this.getPageData();
		String PAGE_URL = "login";
		if(pd.get("PAGE_URL") != null && !pd.get("PAGE_URL").toString().equals("")){
			PAGE_URL = pd.get("PAGE_URL").toString();
		}
		mv.addObject("pd",pd);
		mv.setViewName(PAGE_URL);
		return mv;
	}

	/**
	 * 请求登录，验证用户
	 */
	@RequestMapping(value="/login" ,produces="application/json;charset=UTF-8")
	@ResponseBody
	public Object login(HttpServletRequest request)throws Exception{
		logBefore(logger, "login",request);	
		PageData pd=this.getPageData();
		ResultObject ret = new ResultObject();
		try { 
			String loginName = pd.getString("login_name");
			String loginPassword = pd.getString("login_password");
			loginPassword=MD5.md5(loginPassword);	
			pd.put("login_password", loginPassword);
			PageData pdStaff=staffService.getUserByNameAndPwd(pd);
			if(pdStaff==null){
				ret.setMsg("用户名或密码错误！");
		    	return ret;
			}
			String staff_code = "";//职员编号
			String post_name = "";//职位
			String jbsysc = "";//剩余加班时长
			if(pdStaff != null && pdStaff.get("staff_code") != null){
				staff_code = pdStaff.get("staff_code").toString();
			}
			if(pdStaff != null && pdStaff.get("post_name") != null){
				post_name = pdStaff.get("post_name").toString();
			}
			if(pdStaff != null && pdStaff.get("jbsysc") != null){
				jbsysc = pdStaff.get("jbsysc").toString();
			}

			//shiro管理的session
			Subject currentUser = SecurityUtils.getSubject();  
			Session session = currentUser.getSession();
			CurrentStaff staff = new CurrentStaff();
			staff.setSTAFF_ID(pdStaff.getString("staff_id"));
			staff.setLOGIN_NAME(pdStaff.getString("login_name"));
			staff.setSTAFF_NAME(pdStaff.getString("staff_name"));
			staff.setSTAFF_LEVEL(Integer.parseInt(pdStaff.get("staff_level").toString()));
			staff.setSTAFF_STATUS(pdStaff.getString("staff_status"));
			staff.setSTAFF_CODE(staff_code);
			staff.setPOST_NAME(post_name);
			staff.setDEPT_ID(pdStaff.getString("dept_id"));
			staff.setDEPT_NAME(pdStaff.getString("dept_name"));
			staff.setJBSYSC(jbsysc);


			String join_date = "";
			String zhuanzheng_date = "";
			String shebao_date = "";
			String gongjijin_date = "";
			if(pdStaff.get("join_date") != null && !pdStaff.get("join_date").toString().equals("")){
				join_date = pdStaff.get("join_date").toString();
			}
			if(pdStaff.get("zhuanzheng_date") != null && !pdStaff.get("zhuanzheng_date").toString().equals("")){
				zhuanzheng_date = pdStaff.get("zhuanzheng_date").toString();
			}
			if(pdStaff.get("shebao_date") != null && !pdStaff.get("shebao_date").toString().equals("")){
				shebao_date = pdStaff.get("shebao_date").toString();
			}
			if(pdStaff.get("gongjijin_date") != null && !pdStaff.get("gongjijin_date").toString().equals("")){
				gongjijin_date = pdStaff.get("gongjijin_date").toString();
			}


			staff.setJOIN_DATE(join_date);
			staff.setZHUANZHENG_DATE(zhuanzheng_date);
			staff.setSHEBAO_DATE(shebao_date);
			staff.setGONGJIJIN_DATE(gongjijin_date);
			
			session.setAttribute(Const.SESSION_USER, staff);
			session.removeAttribute(Const.SESSION_SECURITY_CODE);
			//map.put("company_type", pd.getString("company_type"));
			//shiro加入身份验证
			Subject subject = SecurityUtils.getSubject(); 
		    UsernamePasswordToken token = new UsernamePasswordToken(loginName, loginPassword); 
	        subject.login(token); 
	       
	        ret.setEntity(BeanToMapUtil.convertBean(staff));
	        ret.setSuccess(1);
	    } catch (Exception e) { 
	    	ret.setMsg("身份验证异常！");
	    	return ret;
	    }  
		return ret;
	}

	/**
	 * 心跳
	 */
	@RequestMapping(value="/heartbeat")
	@ResponseBody
	public Object heartbeat(HttpServletRequest request)throws Exception{
		ResultObject ret = new ResultObject();
		
		ret.setSuccess(1);
		return ret;
	}
	/**
	 * 退出登录
	 */
	@RequestMapping(value="/logout")
	@ResponseBody
	public Object logout(HttpServletRequest request)throws Exception{
		ResultObject ret = new ResultObject();
		
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		session.removeAttribute(Const.SESSION_USER);
		currentUser.logout();
		
		ret.setSuccess(1);
		return ret;
	}
	/**
	 * 登录
	 */
	@RequestMapping(value="/findbysession")
	@ResponseBody
	public Object findbytoken() {
		logBefore(logger, "findbysession");
		ResultObject ret = new ResultObject();

		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		
		try{

			CurrentStaff user =(CurrentStaff)session.getAttribute(Const.SESSION_USER);
			ret.setEntity(BeanToMapUtil.convertBean(user));
			ret.setSuccess(1);
		} catch(Exception e){
			ret.setSuccess(9);
			logger.error(e.toString(), e);
			ret.setMsg(e.getMessage());
		}
		return ret;
	}

	/**
	 * 验证是否登录了
	 */
	@RequestMapping(value="/findIsLogin")
	@ResponseBody
	public Object findIsLogin() {
		ResultObject ret = new ResultObject();
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		try{
			CurrentStaff user =(CurrentStaff)session.getAttribute(Const.SESSION_USER);
			PageData parms = new PageData();
			//如果没有找到用户
			if(user == null){
				parms.put("IS_LOGIN","false");
			}else{
				parms.put("IS_LOGIN","true");
			}
			ret.setEntity(parms);
			ret.setSuccess(1);
		} catch(Exception e){
			ret.setSuccess(9);
			logger.error(e.toString(), e);
			ret.setMsg(e.getMessage());
		}
		return ret;
	}
	
	/**
	 * 得到menu 的json tree
	 */
	@RequestMapping(value="/getmenutree")
	@ResponseBody
	public Object getmenutree(HttpServletRequest request) {
		logBefore(logger, "getmenutree");
		String ret = "";
		PageData pd=this.getPageData();
		
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		CurrentStaff cuser =(CurrentStaff)session.getAttribute(Const.SESSION_USER);
		pd.put("session_user", cuser);
		try{
			List<PageData> list=caidanService.listAll(pd);
			List<Node> nodes=new ArrayList<Node>();
			for(PageData p:list){
				Node node=(Node)BeanToMapUtil.convertMap(com.fh.utilmy.TreeBuilder.Node.class, p);
				nodes.add(node);
			}
			ret = new TreeBuilder().buildTree(nodes);
			
		} catch(Exception e){
			logger.error(e.toString(), e);
		}
		return ret;
	}

	/**
	 * 最新的上传图片的功能
	 */
	@RequestMapping(value = "/uploadImg", method = RequestMethod.POST)
	@ResponseBody
	public ResultObject moli(@RequestParam("file") MultipartFile file) throws IOException {
		//创建返回值
		ResultObject ret = new ResultObject();
		//添加未登录验证 add by shiyamei 20171219
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		CurrentStaff cuser = (CurrentStaff) session.getAttribute(Const.SESSION_USER);
		if (cuser == null) {
			ret.setSuccess(0);
			ret.setMsg("没有登录");
			return ret;
		}
		try {
			HashMap<String, String> result = FileUploadByHttp.uploadFile(file);
			ret.setEntity(result);
			ret.setSuccess(1);
		} catch (Exception e) {
			ret.setMsg(e.getMessage());
			ret.setSuccess(0);
			logger.error(e.getMessage(), e);
		}
		return ret;
	}

	/**
	 * 根据  RESOURCE_ID 获取 文件流进行下载
	 * 5d831c079bd94e44a2c41f8fe44fdb0c
	 *
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "download")
	@ResponseBody
	public HttpServletResponse download(HttpServletRequest request, HttpServletResponse response) {

		//登录验证
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		CurrentStaff cuser = (CurrentStaff) session.getAttribute(Const.SESSION_USER);
		if (cuser == null) {
			return null;
		}

		FileInputStream fis = null;
		response.setContentType("multipart/form-data");
		try {
			byte[] buf = new byte[1024];
			int len = 0;
			String filePathUrl = (String) MiceConfig.getContextProperty("filePathUrl");
			PageData pd = this.getPageData();
			String RESOURCE_ID = pd.getString("RESOURCE_ID");

			if (Tools.isEmpty(RESOURCE_ID)) {
				throw new Exception("RESOURCE_ID为空!");
			}

			String httpReqUrl = filePathUrl + "web/getFile/" + RESOURCE_ID;
			HttpClient httpClient = new SSLClient();
			HttpGet httpGet = new HttpGet(httpReqUrl);
			HttpResponse httpResponse = httpClient.execute(httpGet);
			int status = httpResponse.getStatusLine().getStatusCode();

//            不成功返回null
			if (status != 200) {
				return null;
			}

			HttpEntity httpEntity = httpResponse.getEntity();
			Header[] header = httpResponse.getAllHeaders();

			String fileName = "";
			for (Header headerTemp : header) {
				if ("fileName".equals(headerTemp.getName())) {
					String[] strTemp = headerTemp.getValue().split(":");
					fileName = strTemp[0];
					break;
				}

			}

//            fileName为空返回null
			if (Tools.isEmpty(fileName)) {
				return null;
			}

			String userAgent = request.getHeader("User-Agent");
			String formFileName = fileName;

			// 针对IE或者以IE为内核的浏览器：
			if (userAgent.contains("MSIE") || userAgent.contains("Trident")) {
				formFileName = java.net.URLEncoder.encode(formFileName, "UTF-8");
			} else {
				// 非IE浏览器的处理：
				formFileName = new String(formFileName.getBytes("UTF-8"), "ISO-8859-1");
			}

			response.setHeader("Content-disposition",
					String.format("attachment; filename=\"%s\"", formFileName));
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setCharacterEncoding("UTF-8");

			InputStream is = httpEntity.getContent();
			byte[] bytes = new byte[1024];
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			int count = 0;
			while ((count = is.read(bytes)) != -1) {
				bos.write(bytes, 0, count);
			}
			byte[] byteArray = bos.toByteArray();
			OutputStream out = response.getOutputStream();
			out.write(byteArray);
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


		return null;
	}






	
}
