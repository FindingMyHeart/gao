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
		<title>添加邮件</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
		<!-- Lib Scripts Plugin Js -->
		<script src="static/bundles/vendorscripts.bundle.js"></script>
		<!-- Lib Scripts Plugin Js -->
		<script src="static/plugins/momentjs/moment.js"></script>
		<!-- Moment Plugin Js -->
		<script src="static/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
		<!-- Bootstrap Material Datetime Picker Plugin Js -->
		<script src="static/bundles/datatablescripts.bundle.js"></script>
		<!-- Jquery DataTable Plugin Js -->
		<script src="static/plugins/dropzone/dropzone.js"></script>
		<!-- Dropzone Plugin Js -->
		
		<!-- Custom Js -->
		<script src="static/js/pages/forms/basic-form-elements.js"></script>
		
		<script type="text/javascript">
			
			var pid = "";
			var selectusers = [];

			function initit() {
				//获取UUID
				myjstools.ajax(false, "POST", "/web/service?METHOD=get_uuid", {}, function(data) {
					try {
						if(data.success != 1) {
							alert("server.error:" + data.msg);
							return;
						}

						pid = data.entity.pk_id;
						//alert(pid);
					} catch(e) {
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
					minimumInputLength: 0, //搜索框至少要输入的长度，此处设置后需输入才显示结果
					maximumSelectionLength: 32, //设置最多可以选择多少项
					ajax: {
						url: myjstools.wwwroot + "/web/service?METHOD=staff_combox",
						type: "post",
						dataType: 'json',
						delay: 250,
						data: function(params) {
							return {
								q: params.term // search term
							};
						},
						processResults: function(data, params) {
							for(var i = 0; i < data.length; i++) {
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
					placeholder: '请输入后选择', //默认文字提示
					escapeMarkup: function(markup) {
						return markup;
					}, // 让template的html显示效果，否则输出代码
					templateResult: function formatRepo(repo) {
						return repo.text;
					}, // 自定义下拉选项的样式模板
					templateSelection: function formatRepoSelection(repo) {
						return repo.text;
					} // 自定义选中选项的样式模板
				});

			}
			$(function() {
				initit();
			});

			function saveit() {
				if($("#f_bt").val() == "") {
					alert('请输入标题');
					return;
				}
				if($("#f_nr").val() == "") {
					alert('请输入内容');
					return;
				}

				var objt = myjstools.getallinput();
				objt.f_yjid = pid;
				var f_jsyhid = $("#senduser").select2("val");
				objt.f_jsyhid = f_jsyhid.join(",");
				myjstools.ajax(false, "POST", "/web/service?METHOD=yjyxfs", objt, saveit_res);
			}

			function saveit_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}

					alert("操作成功")

				} catch(e) {
					alert("saveit_res.error:出错了！" + e.message);
				}
			}

			function saveit_cg() {
				var objt = myjstools.getallinput();
				objt.f_yjid = pid;
				var f_jsyhid = $("#senduser").select2("val");
				objt.f_jsyhid = f_jsyhid.join(",");
				myjstools.ajax(false, "POST", "/web/service?METHOD=yjyxtj", objt, function(data) {
					try {
						if(data.success != 1) {
							alert("server.error:" + data.msg);
							return;
						}

						alert("操作成功。")
						var index = parent.layer.getFrameIndex(window.name);
						alert(index);
        				parent.layer.close(index);
						//parent.closewin();
					} catch(e) {
						alert("saveit_res.error:出错了！" + e.message);
					}
				});
			}

		</script>
	</head>

	<body class="theme-black">

		<section class="content-modals">
			<div class="container-fluid">
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>邮件信息</strong></h2>
							</div>
							<div class="body">
								<!-- 客户表的主键ID -->
								<input type="hidden" id="pk_id" value="">
								<div class="row clearfix">
									<div class="col-sm-12 m-b-20">
										<label for="senduser" class="col-sm-3">收件人：</label>
										<div class="col-sm-3">
										    <select id="senduser" class="js-example-basic-single form-control" multiple="multiple"></select>
										</div>	
									</div>
									<div class="col-sm-12 m-b-20">
										<label for="f_bt" class="col-sm-3">主题：</label>
										<div class="col-sm-3">
										   <input class="form-control" type="text" id="f_bt" up="up">
										</div>	
									</div>
									<div class="col-sm-12">
										<label for="f_nr" class="col-sm-3">邮件内容：</label>
										<div class="col-sm-12">
										   <div class="form-line">
												<textarea rows="4" class="form-control no-resize" id="f_nr" up="up"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row clearfix">
					<div class="col-sm-12">
						<div class="card">
							<div class="body">
								<div class="col-sm-12">
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" onclick="saveit()">发送</button>
									<button class="btn btn-raised bg-blue-grey btn-round waves-effect" type="button" onclick="saveit_cg()">保存草稿</button>
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	</body>

</html>