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
    <title>修改</title>

	<link rel="stylesheet" type="text/css" href="../css/common.css" />
	
	
	<link id="linkm" rel="stylesheet" type="text/css" href="../themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="../themes/icon.css" />
    
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../js/easyui-lang-zh_CN.js"></script>
    
    <script type="text/javascript" src="../js/myjstools.js"></script>
    
    <script type="text/javascript">
    	var id = myjstools.request("id").replace("#" ,"");
    	var pid = "";
    	var pk_id = id;
    	
    	function initit()
		{
			top.hangge();
			
			myjstools.ajax(false, "POST", "/app/web?method=yjyxlb", {pk_id:pk_id}, getinfo_res);
			
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
                                    {field:'f_zh'.toLowerCase(),title:'编号'}
                                    , {field:'F_WJMC'.toLowerCase(),title:'文件名称'}
                                    , {field:'F_WJLJ'.toLowerCase(),title:'文件路径'
                                    	, formatter:function(value,row,index){
                                    		return '<a href="' + myjstools.wwwroot + value + '" target="_blank">' + value + '</a>';
                                    	}
                                    }
                                    ,{field:'pk_id'.toLowerCase(),title:' '
                                    	, formatter:function(value,row,index){
                                    		return '<a href="javascript:scfj(\'' + value + '\')">删除</a>';
                                    	}
                                    }
                                ]]                                    
                }
            );
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
    </script>
    
    <script type="text/javascript">
		function saveit()
		{
    		if($("#f_bt").val() == ""){alert('请输入标题'); return ;}
    		if($("#f_nr").val() == ""){alert('请输入内容'); return ;}
    		
			var objt = myjstools.getallinput();
			
			objt.pk_id = pk_id;
			objt.f_yjid = pid;
			
			var f_jsyhid = "";
    		
    		for(var i=0; i<selectusers.length; i++)
    		{
    			f_jsyhid+= selectusers[i].id + ","
    		}
            if(f_jsyhid!= "")
    		{
    			f_jsyhid = f_jsyhid.substr(0, f_jsyhid.length-1);
    		}
    		
    		if(f_jsyhid == "")
    		{
    			alert('请选择收件人'); return ;
    		}
            
            objt.f_jsyhid = f_jsyhid;
            
			myjstools.ajax(false, "POST", "/app/web?method=yjyxfs", objt, saveit_res);
    	}
		
		function saveit_cg()
		{
    		var objt = myjstools.getallinput();
			
			objt.pk_id = pk_id;
			objt.f_yjid = pid;
			
			var f_jsyhid = "";
    		
    		for(var i=0; i<selectusers.length; i++)
    		{
    			f_jsyhid+= selectusers[i].id + ","
    		}
            if(f_jsyhid!= "")
    		{
    			f_jsyhid = f_jsyhid.substr(0, f_jsyhid.length-1);
    		}
            
            objt.f_jsyhid = f_jsyhid;
            
			myjstools.ajax(false, "POST", "/app/web?method=yjyxxg", objt, saveit_res);
    	}
        
        function saveit_res(data)
        {
        	try {
				if (data.success != 1) {
					alert("server.error:" + data.msg);
					return;
				}
				
				alert("操作成功。")
				
				parent.closewin();
			} catch (e) {
				alert("saveit_res.error:出错了！" + e.message);
			}
        }
    </script>
    <script type="text/javascript">
    	function gotoaddfj()
    	{
    		$('#win2').window('open');
			
			$('#win2').window('setTitle', "添加附件");
			
			$("#fra_s2").attr("src", myjstools.wwwroot + "/pchtml/addfj.html?f_lx=yj&id=" + pid);
    	}
    	
    	function scfj(fjid)
    	{
    		if(confirm("确认删除?"))
    		{
    			myjstools.ajax(false, "POST", "/app/web?method=fjsc", {pk_id : fjid}, scfj_res);
    		}
    	}
    	
    	function scfj_res(data)
    	{
    		try {
				if (data.success != 1) {
					alert("server.error:" + data.msg);
					return;
				}
				
				alert("操作成功。")
				
				$('#dg_fj').datagrid("reload");
			} catch (e) {
				alert("saveit_res.error:出错了！" + e.message);
			}
    	}
    	
    	function closewin()
		{
			$('#win2').window('close');
			
			$('#dg_fj').datagrid("reload");
		}
    </script>
    <script type="text/javascript">
    	function delit()
    	{
    		if(confirm("确认删除？"))
    		{
    			myjstools.ajax(true, "POST", "/app/web?method=yjyxsc", {pk_id:id}, del_res);
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
				
				parent.closewin();
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
    		
    		$('#win2').window('close');
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
            	<span id="div_showuser"></span>
            	<a href="#" class="easyui-linkbutton fw-btn" onclick="gotoselectuser()" >选择</a>
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
            	<a href="javascript:gotoaddfj()" class="easyui-linkbutton fw-btn">添加附件</a>
            	<br />
			    <table id="dg_fj"  title="" style="width:95%;" align="center"></table>
			    <br />
           	</td>
        </tr>
        
    </table>
    <table style="width:100%">
        <tr>
            <td>
                <div style="text-align:center;padding:5px">
                    <a href="javascript:void(0)" data-options="iconCls:'icon-ok'" class="easyui-linkbutton fw-btn" onclick="saveit()" >发送</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="javascript:void(0)" data-options="iconCls:'icon-save'" class="easyui-linkbutton fw-btn" onclick="saveit_cg()" >保存草稿</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="javascript:delit()" data-options="iconCls:'icon-cancel'" class="easyui-linkbutton fw-btn">删除</a>
                </div>
            </td>
        </tr>

    </table>
    
    
    <div id="win2" class="easyui-window" title="..." style="width:400px;height:300px;"
        data-options="modal:true,closed:true">
    	<iframe id="fra_s2" width="99%" height="99%" border="0" frameborder="0"></iframe>
	</div>
</body>
</html>
