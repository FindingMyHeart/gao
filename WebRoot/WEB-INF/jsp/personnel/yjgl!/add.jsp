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
		<title>邮件添加</title>
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

		<link href="static/plugins/select2/select2.min.css" rel="stylesheet" />
		<script src="static/plugins/select2/select2.min.js"></script>
		<!-- 公共的样式 -->
		<link rel="stylesheet" href="static/css/common.css" />
		<!-- myjstools -->
		<script type="text/javascript" src="static/js/modules/common/myjstools.js"></script>
		<script type="text/javascript" src="static/js/modules/common/common.js"></script>


	</head>
	<body class="theme-blue" id="entry_body">
	<!-- main content -->
	<section class="content-all">
		<div class="container-fluid">
			<div class="block-header">
				<h2>邮件管理</h2>
				<ul class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="index.html">系统管理</a>
					</li>
					<li class="breadcrumb-item active">邮件管理</li>
				</ul>
			</div>
			<!-- Input -->
			<div class="row clearfix">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="card">
						<div class="body">
							<h2 class="card-inside-title">邮件信息</h2>
							<!-- 客户表的主键ID -->
							<input type="hidden" id="pk_id" value="" >
							<div class="row clearfix">
								<div class="">
									<div class="form-group form-float" >
										<label class="form-label" >收件人:</label>
										<select id="senduser" class="js-example-basic-single" multiple="multiple" style="width: 60%">
										</select>
									</div>
								</div>
							</div>
							<div class="row clearfix">
								<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
									<div class="form-group form-float">
										<label class="form-label">标题:</label>
										<input type="text" class="form-control" id="f_bt" up="up" />
									</div>
								</div>
							</div>
							<div class="row clearfix">
								<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
									<div class="form-group form-float">
										<label class="form-label">内容:</label>
										<textarea name="f_nr" id="f_nr" style="width: 500px; height: 200px;" up="up" ></textarea>
										
									</div>
								</div>
							</div>
							<div class="row clearfix">
								<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
									<div class="form-group form-float">
										<a href="javascript:void(0)" class="easyui-linkbutton fw-btn" onclick="saveit()" >发送</a>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<a href="javascript:void(0)" class="easyui-linkbutton fw-btn" onclick="saveit_cg()" >保存草稿</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			

		</div>
	</section>
	</body>
	<script type="text/javascript">
        var pid = "";
        var selectusers = [];

        function initit(){
        	
            //获取UUID
            myjstools.ajax(false, "POST", "/web/service?METHOD=get_uuid", {}, function(data){
                try {
                    if (data.success != 1) {
                        alert("server.error:" + data.msg);
                        return;
                    }

                    pid = data.entity.pk_id;
                    //alert(pid);
                } catch (e) {
                    alert("saveit_res.error:出错了！" + e.message);
                }
            });
            /*
            $(".js-example-basic-single").select2({
            	  placeholder: 'Select an option'
            });
            */
            //加载下拉树组件
            $("#senduser").select2({
                minimumInputLength: 0,    //搜索框至少要输入的长度，此处设置后需输入才显示结果
                maximumSelectionLength: 32, //设置最多可以选择多少项
                ajax: {
                    url: myjstools.wwwroot +"/web/service?METHOD=staff_combox",
                    type:"post",
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                     		q: params.term // search term
                        };
                    },
                    processResults: function (data, params) {
	                    	for (var i = 0; i < data.length; i++) {
	                    		data[i].id = data[i].staff_id;
                            	data[i].text = data[i].staff_name;
                        }
                        return {
                            results: data
                        };
                    },
                    cache: true
                },
                allowClear: true,
                placeholder:'请输入后选择',//默认文字提示
                escapeMarkup: function (markup) {return markup; }, // 让template的html显示效果，否则输出代码
                templateResult: function formatRepo(repo){return repo.text;},// 自定义下拉选项的样式模板
                templateSelection: function formatRepoSelection(repo){return repo.text;}    // 自定义选中选项的样式模板
            });
			
        }
        $(function(){
            initit();
        });

        function saveit(){
            if($("#f_bt").val() == ""){alert('请输入标题'); return ;}
            if($("#f_nr").val() == ""){alert('请输入内容'); return ;}

            var objt = myjstools.getallinput();
            objt.f_yjid = pid;
            var f_jsyhid = $("#senduser").select2("val");
            objt.f_jsyhid = f_jsyhid.join(",");
            myjstools.ajax(false, "POST", "/web/service?METHOD=yjyxfs", objt, saveit_res);
        }
        function saveit_res(data)
        {
        	try {
				if (data.success != 1) {
					alert("server.error:" + data.msg);
					return;
				}
				
				alert("操作成功")
				
			} catch (e) {
				alert("saveit_res.error:出错了！" + e.message);
			}
        }
        function saveit_cg(){
            var objt = myjstools.getallinput();
            objt.f_yjid = pid;
            var f_jsyhid = $("#senduser").select2("val");
            objt.f_jsyhid = f_jsyhid.join(",");
            myjstools.ajax(false, "POST", "/web/service?METHOD=yjyxtj", objt, function(data){
                try {
                    if (data.success != 1) {
                        alert("server.error:" + data.msg);
                        return;
                    }

                    alert("操作成功。")

                    //parent.closewin();
                } catch (e) {
                    alert("saveit_res.error:出错了！" + e.message);
                }
			});
        }

        function gotoselectuser(){
            openBootStrapDialog("选择收件人","yjgl/selectuser","1");

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
</html>									
									
								