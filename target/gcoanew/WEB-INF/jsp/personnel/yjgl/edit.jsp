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
		<title>修改邮件</title>
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
		<script src="static/bundles/mainscripts.bundle.js"></script>
		<!-- Custom Js -->
		<script src="static/js/pages/forms/basic-form-elements.js"></script>
		
		<script type="text/javascript">
			var id = myjstools.request("id").replace("#", "");
			var pid = "";
			var pk_id = id;

			function initit() {
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
				
				myjstools.ajax(false, "POST", "/web/service?METHOD=yjyxlb", {
					pk_id: pk_id
				}, getinfo_res);
				
				
				/*
				//初始化grid
				$('#dg_fj').datagrid({
					iconCls: 'icon-edit',
					singleSelect: true,
					pagination: false,
					url: myjstools.wwwroot + '/app/web?method=fjlb&f_lx=yj&fk_id=' + pid,
					rownumbers: true,
					loadMsg: '正在加载数据...',
					onLoadError: function() {
						alert('数据加载出错了');
					},
					method: 'post',
					columns: [
						[{
							field: 'f_zh'.toLowerCase(),
							title: '编号'
						}, {
							field: 'F_WJMC'.toLowerCase(),
							title: '文件名称'
						}, {
							field: 'F_WJLJ'.toLowerCase(),
							title: '文件路径',
							formatter: function(value, row, index) {
								return '<a href="' + myjstools.wwwroot + value + '" target="_blank">' + value + '</a>';
							}
						}, {
							field: 'pk_id'.toLowerCase(),
							title: ' ',
							formatter: function(value, row, index) {
								return '<a href="javascript:scfj(\'' + value + '\')">删除</a>';
							}
						}]
					]
				});
				*/
			}

			$(
				function() {
					initit();
				}
			);
		</script>
		<script type="text/javascript">
			function getinfo_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}

					var info = data.rows[0];

					pid = info.f_yjid;

					myjstools.setallinput(info);

					selectusers = [];

					var tt = info.f_jsyhid.split(",");
					var tt2 = info.f_fsyhmc.split(",");
					for(var i = 0; i < tt.length; i++) {
						selectusers[selectusers.length] = {
							id: tt[i],
							text: tt2[i]
						};
					}
					showselectuser();
				} catch(e) {
					alert("getinfo_res.error:出错了！" + e.message);
				}
			}
		</script>

		<script type="text/javascript">

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

					//parent.closewin();
				} catch(e) {
					alert("saveit_res.error:出错了！" + e.message);
				}
			});
		}
		</script>
		<script type="text/javascript">
			function gotoaddfj() {
				$('#win2').window('open');

				$('#win2').window('setTitle', "添加附件");

				$("#fra_s2").attr("src", myjstools.wwwroot + "/pchtml/addfj.html?f_lx=yj&id=" + pid);
			}

			function scfj(fjid) {
				if(confirm("确认删除?")) {
					myjstools.ajax(false, "POST", "/app/web?method=fjsc", {
						pk_id: fjid
					}, scfj_res);
				}
			}

			function scfj_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}

					alert("操作成功。")

					$('#dg_fj').datagrid("reload");
				} catch(e) {
					alert("saveit_res.error:出错了！" + e.message);
				}
			}

			function closewin() {
				$('#win2').window('close');

				$('#dg_fj').datagrid("reload");
			}
		</script>
		<script type="text/javascript">
			function delit() {
				if(confirm("确认删除？")) {
					myjstools.ajax(true, "POST", "/web/service?METHOD=yjyxsc", {
						pk_id: id
					}, del_res);
				}
			}
	
			function del_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}
	
					alert("操作成功");
	
				} catch(e) {
					alert("saveit_res.error:出错了！" + e.message);
				}
			}
		</script>

		<script type="text/javascript">
			var selectusers = [];

			function gotoselectuser() {
				$('#win2').window('open');

				$('#win2').window('setTitle', "选择收件人");

				$("#fra_s2").attr("src", myjstools.wwwroot + "/pchtml/yjgl/selectuser.html");
			}

			function gotoselectuser_res(res) {
				selectusers = eval("(" + res + ")");

				showselectuser();

				$('#win2').window('close');
			}

			function showselectuser() {
				var newhtml = "";

				for(var i = 0; i < selectusers.length; i++) {
					newhtml += selectusers[i].id + ","
				}

				if(newhtml != "") {
					newhtml = newhtml.substr(0, newhtml.length - 1);
				}
				//alert(newhtml);
				$('#senduser').val('1');
				$('#senduser').trigger('change');
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
								<div class="row clearfix">
									<div class="col-sm-12 m-b-20">
										<label for="senduser">收件人：</label>
										<select id="senduser" class="js-example-basic-single" multiple="multiple" style="width: 60%">
										</select>
									</div>
									<div class="col-sm-12 m-b-20">
										<label for="f_bt">主题：</label>
										<div class="form-group">
											<input class="form-control" type="text" name="f_bt" id="f_bt" up="up">
										</div>
									</div>
									<div class="col-sm-12">
										<div class="form-group">
											<label for="f_nr">邮件内容：</label>
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" name="f_nr" id="f_nr" up="up"></textarea>
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
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</body>

</html>