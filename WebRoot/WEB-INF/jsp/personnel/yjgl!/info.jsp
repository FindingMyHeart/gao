<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
    <title>详细信息</title>
<link rel="icon" href="static/images/favicon.ico" type="image/x-icon">
<!-- Favicon-->
<link href="static/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<!-- Bootstrap Material Datetime Picker Css -->
<link href="static/plugins/dropzone/dropzone.css" rel="stylesheet">
<!-- Dropzone Css -->
<link href="static/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
<!-- Wait Me Css -->
<link href="static/plugins/waitme/waitMe.css" rel="stylesheet" />
<!-- Bootstrap Select Css -->
<link href="static/plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />
<!-- Custom Css -->
<link href="static/css/main.css" rel="stylesheet">
<!-- choose a theme from css/themes instead of get all themes -->
<link href="static/css/font-awesome.min.css" rel="stylesheet" />

<link href="static/css/themes/all-themes.css" rel="stylesheet" />

<link href="static/plugins/animate-css/animate.css" rel="stylesheet" />
<!-- jquery.js -->
<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>
<!-- Lib Scripts Plugin Js ( jquery.v3.2.1, Bootstrap4 js) -->
<script src="static/bundles/vendorscripts.bundle.js"></script>
<!-- Lib Scripts Plugin Js -->
<script src="static/plugins/autosize/autosize.js"></script>
<!-- Autosize Plugin Js -->
<script src="static/plugins/momentjs/moment.js"></script>
<!-- Moment Plugin Js -->
<script src="static/plugins/dropzone/dropzone.js"></script>
<!-- Bootstrap Material Datetime Picker Plugin Js -->
<script src="static/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="static/bundles/mainscripts.bundle.js"></script>
<!-- Custom Js -->
<script src="static/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- bootstrap-notify -->
<script src="static/plugins/bootstrap-notify/bootstrap-notify.js"></script>
<!-- myjstools -->
<script type="text/javascript" src="static/js/modules/common/myjstools.js"></script>
<script type="text/javascript" src="static/js/modules/common/common.js"></script>

    
    <script type="text/javascript">
    	var id = myjstools.request("id").replace("#" ,"");
    	alert(myjstools.request("id"));
    	var pid = id;
    	var pk_id = id;
    	
    	function onDblClickRow()
    	{
    		
    	}
    	
    	function initit()
		{
			
			
			myjstools.ajax(false, "POST", "/web/service?METHOD=yjyxlb", {pk_id:pk_id}, getinfo_res);
			
			myjstools.ajax(true, "POST", "/web/service?METHOD=yjyxyd", {pk_id:pk_id}, setreaded_res);
			/*
			//初始化grid
            $('#dg_fj').datagrid(
                {
                    iconCls: 'icon-edit'
                    ,singleSelect: true
			        ,pagination: false
			        ,url: myjstools.wwwroot + '/app/web?method=fjlb&f_lx=yj&fk_id=' + pid
			        ,rownumbers:true
			        ,loadMsg:'正在加载数据...'
			        ,onLoadError:function(){alert('数据加载出错了');}
			        ,method:'post'
			        , columns:[[  
                                    {field:'f_bh'.toLowerCase(),title:'编号'}
                                    , {field:'F_WJMC'.toLowerCase(),title:'文件名称'}
                                    , {field:'F_WJLJ'.toLowerCase(),title:'文件路径'
                                    	, formatter:function(value,row,index){
                                    		return '<a href="' + myjstools.wwwroot + '/app/getfile?path=' + value + '" target="_blank">' + value + '</a>';
                                    	}
                                   }
                                ]]                                    
                }
            );
            */
            
            
		}
    
    	$(
            function(){
            	initit();
            }
        );
    </script>
    
    <script type="text/javascript">
    	function getinfo_res(data)
    	{
    		try {
				
				if (data.success != 1) {
					alert("server.error:" + data.msg);
					return;
				}
				
				var info = data.rows[0];
				
				pid = info.f_yjid;
				
				myjstools.setallinput(info);
				
				selectusers = [];
				
				var tt = info.f_jsyhid.split(",");
				var tt2 = info.f_fsyhmc.split(",");
				for(var i=0;i<tt.length;i++)
				{
					selectusers[selectusers.length] = {id:tt[i], text:tt2[i]};
				}
				
				showselectuser();
			} catch (e) {
				alert("getinfo_res.error:出错了！" + e.message);
			}
    	}
    	
    	function setreaded_res(data)
    	{
    		try {
				if (data.success != 1) {
					alert("server.error:" + data.msg);
					return;
				}
				
//				alert("操作成功");
//				
//				parent.closewin();
			} catch (e) {
				alert("setreaded_res.error:出错了！" + e.message);
			}
    	}
    </script>
    
    <script type="text/javascript">
    	function delit()
    	{
    		if(confirm("确认删除？"))
    		{
    			myjstools.ajax(true, "POST", "/web/service?METHOD=yjyxsc", {pk_id:id}, del_res);
    		}
    	}
    	
    	function del_res(data)
    	{
    		try {
				if (data.success != 1) {
					alert("server.error:" + data.msg);
					return;
				}
				
				alert("操作成功");
				
				
			} catch (e) {
				alert("saveit_res.error:出错了！" + e.message);
			}
    	}
    </script>
    <script type="text/javascript">
    	var selectusers = [];
    	function gotoselectuser()
    	{
    		$('#win2').window('open');
			
			$('#win2').window('setTitle', "选择收件人");
			
			$("#fra_s2").attr("src", myjstools.wwwroot + "/pchtml/yjgl/selectuser.html");
    	}
    	
    	function gotoselectuser_res(res)
    	{
    		selectusers =  eval("("+res+")");
    		
    		showselectuser();
    	}
    	
    	function showselectuser()
    	{
    		var newhtml = "";
    		
    		for(var i=0; i<selectusers.length; i++)
    		{
    			newhtml+= selectusers[i].text + ","
    		}
    		
    		if(newhtml!= "")
    		{
    			newhtml = newhtml.substr(0, newhtml.length-1);
    		}
    		
    		$("#div_showuser").html(newhtml);
    	}
    </script>
</head>
<body style="width:100%; margin:0; height:100%">
	<table class="fs20">
		<tr>
            <td align="right"><span class="fw-label">收件人:</span></td>
            <td>
            	<div id="div_showuser"></div>
           	</td>
        </tr>
        <tr>
            <td align="right"><span class="fw-label">标题:</span></td>
            <td>
            	<input class="easyui-textbox fw-text w200" type="text" name="f_bt" id="f_bt" up="up" style="width: 500px;" />
           	</td>
        </tr>
        <tr>
            <td align="right"><span class="fw-label">内容:</span></td>
            <td>
            	<textarea name="f_nr" id="f_nr" style="width: 500px; height: 200px;" up="up" ></textarea>
           	</td>
        </tr>
        <tr>
            <td align="right"><span class="fw-label">附件:</span></td>
            <td>
            	<table id="dg_fj"  title="" style="width:95%;" align="center"></table>
           	</td>
        </tr>
        
    </table>
    <br />
    <table style="width:100%">
        <tr>
            <td>
                <div style="text-align:center;padding:5px">
                	<span id="btn_del" ><a href="javascript:delit()" data-options="iconCls:'icon-cancel'" class="easyui-linkbutton fw-btn">删除</a></span>
                </div>
            </td>
        </tr>
    </table>

    
   
	
	
</body>
</html>
