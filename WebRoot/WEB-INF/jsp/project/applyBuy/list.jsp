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
		<title>申购查询</title>
		<base href="<%=basePath%>">
		<jsp:include page="../../include/top.jsp"></jsp:include>
		<!-- bootstrap-dialog -->
		<!--<script type="text/javascript" src="static/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>-->
		<!-- sweetAlert -->
		<link rel="stylesheet" href="static/plugins/sweetalert/sweetalert.css">
		<!--<script type="text/javascript" src="static/plugins/sweetalert/sweetalert.min.js"></script>-->

		<link rel="stylesheet" type="text/css" media="screen" href="static/jquery.jqGrid-4.4.3/css/ui.jqgrid.css" />
		<script language="javascript" type="text/javascript" src="static/js/jquery-1.8.0.min.js"></script>
		<script language="javascript" type="text/javascript" src="static/js/myjstools.js"></script>
		<script language="javascript" type="text/javascript" src="static/jquery.jqGrid-4.4.3/js/jquery.jqGrid.min.js"></script>
		<script language="javascript" type="text/javascript">
			function initit() {
				try {
					//myjstools.ajax(true, "POST", "/app/weixin/client.ashx?action=getmyinfo", {}, getmyinfo_res);
					initgrid();
				} catch(e) {
					myjstools.showerrinfo("initit.error:出错了！" + e.message);
				}
			}

			$(
				function() {
					initit();
				}
			);
		</script>
		<script language="javascript" type="text/javascript">
			function getmyinfo_res(data) {
				try {
					if(!data.success) {
						myjstools.showerrinfo(data.message);
						if(data.message == "没有找到您的登录信息") {
							document.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5b7a85ce9b28997&redirect_uri=http%3a%2f%2fwx.ddbsjz.com%2fapp%2fweixin%2fcolor_list.aspx&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
						}
						return;
					}

					if(data.rows[0].truename == "") {
						document.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc5b7a85ce9b28997&redirect_uri=http%3a%2f%2fwx.ddbsjz.com%2fapp%2fweixin%2fzc.aspx&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
					}
				} catch(e) {
					myjstools.showerrinfo("addclientaddress_res.error:出错了！" + e.message);
				}
			}
		</script>
		<script language="JavaScript" type="text/javascript">
			function initgrid() {
				$("#table_list").jqGrid({
						url: myjstools.wwwroot + '/web/service?METHOD=applyBuy_listDetail',
						datatype: "json",
						colNames: ['申购订单号'],
						colModel: [{
							name: 'APPLYBUY_ID',
							index: 'APPLYBUY_ID',
							width: 55
						}],
						rowNum: 20,
						rowList: [10, 20, 30],
						pager: '#div_pager',
						sortname: 'id',
						viewrecords: true,
						sortorder: "desc"
						//, caption:"JSON Example"
						, jsonReader: {
							root: "data",
							page: "count",
							total: "count",
							records: "count",
							id: "APPLYBUY_DETAIL_ID",
							userdata: "data"
						}
					}
				);
						
				$("#table_list").jqGrid('navGrid', '#div_pager', {
						edit: false,
						add: false,
						del: false
				});
			}
		</script>
	</head>

	<body class="theme-blue">
		<jsp:include page="../../include/loader.jsp"></jsp:include>
		<jsp:include page="../../include/sidebar.jsp"></jsp:include>
		<!-- main content -->
		<section class="content">
			<div class="container-fluid">
				<div class="block-header">
					<h2>申购查询</h2>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<a href="index.html">首页</a>
						</li>
						<li class="breadcrumb-item active">申购管理</li>
					</ul>
				</div>
				<!-- Input -->
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2> 申购查询 <small>请填写相关内容</small> </h2>
								<ul class="header-dropdown m-r--5">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more-vert"></i> </a>
										<ul class="dropdown-menu pull-right">
											<li>
												<a href="javascript:void(0);" @click="save">申购录入</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<h2 class="card-inside-title">条件查询</h2>
								<div class="row clearfix">
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<input type="text" class="form-control" />
												<label class="form-label">申购订单号</label>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<input class="datepicker form-control" type="text" placeholder="申购日期">
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<select class="form-control show-tick">
													<option value="">-- 项目名称 --</option>
													<option value="">系统内部选取</option>
												</select>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<select class="form-control show-tick">
													<option value="">-- 系统名称 --</option>
													<option value="">系统内部选取</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="body">
								<div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-4 col-xs-offset-5" style="margin-left: 0px;">
									<button type="button" class="btn btn-raised btn-primary m-t-15 waves-effect">查询</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="body table-responsive">
								<h2 class="card-inside-title">查询结果</h2>
								<table id="table_list"></table>
								<div id="div_pager"></div>
								<!-- 
								<table class="table table-striped">
									<thead>
										<tr>
											<th>#</th>
											<th>申购订单号</th>
											<th>申购日期</th>
											<th>项目名称</th>
											<th>系统名称</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<input class="form-control" type="text" name="id" value="${vs.index + 1 }" readonly/>
											</td>
											<td>
												<input class="form-control" type="text" value="" readonly/>
											</td>
											<td>
												<input class="form-control" type="text" value="" readonly/>
											</td>
											<td>
												<input class="form-control" type="text" value="" readonly/>
											</td>
											<td>
												<input class="form-control" type="text" value="" readonly/>
											</td>
											<td>
												<button type="button" class="btn btn-raised btn-success btn-xs waves-effect">修改</button>
												<button type="button" class="btn btn-raised btn-warning btn-xs waves-effect">删除</button>
												<!--采购部显示-->
								<button type="button" class="btn btn-raised btn-danger btn-xs waves-effect">加入采购订单</button>
								<!--采购部显示-->
								<button type="button" class="btn btn-raised btn-info btn-xs waves-effect">预览</button>
								<button type="button" class="btn btn-raised btn-primary btn-xs waves-effect">打印</button>
								<button type="button" class="btn btn-raised btn-default btn-xs waves-effect">下载</button>
								</td>
								</tr>
								</tbody>
								</table>
								-->
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>-->
	</body>

</html>