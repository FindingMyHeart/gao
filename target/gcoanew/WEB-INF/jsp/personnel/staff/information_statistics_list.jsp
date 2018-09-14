<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
		<title>职员信息统计</title>
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
		<link href="static/css/themes/all-themes.css" rel="stylesheet" />
	</head>

	<body class="theme-blue">

		<!-- Page Loader -->
		<jsp:include page="../../include/loader.jsp"></jsp:include>
		<!-- #END# Page Loader -->

		<!-- Top Bar -->
		<jsp:include page="../../include/header.jsp"></jsp:include>
		<!-- #Top Bar -->

		<!--Side menu -->
		<jsp:include page="../../include/menu.jsp"></jsp:include>
		<!-- #END# Side menu -->
		<!-- Right Sidebar -->
		<jsp:include page="../../include/sidebar.jsp"></jsp:include>
		<!-- #END# Right Sidebar -->

		<!-- main content -->
		<section class="content-all">
			<div class="container-fluid">
				<div class="block-header">
					<h2>职员信息统计</h2>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<a href="index.html">首页</a>
						</li>
						<li class="breadcrumb-item">人事管理</li>
						<li class="breadcrumb-item active">职员管理</li>
					</ul>
				</div>
				<!-- Input -->
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2> 职员信息统计 <small>请填写相关内容</small> </h2>
								<ul class="header-dropdown m-r--5">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more-vert"></i> </a>
									</li>
								</ul>
							</div>
							<div class="body">
								<h2 class="card-inside-title">条件查询</h2>
								<div class="row clearfix">
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<select class="form-control show-tick">
													<option value="">-- 部门 --</option>
													<option value="">市场部</option>
													<option value="">商务部</option>
													<option value="">技术部</option>
													<option value="">工程部</option>
													<option value="">采购部</option>
													<option value="">仓储部</option>
													<option value="">售后部</option>
													<option value="">人事部</option>
													<option value="">行政部</option>
													<option value="">财务部</option>
												</select>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<select class="form-control show-tick">
													<option value="">--职位 --</option>
													<option value="">部门经理</option>
													<option value="">部门副经理</option>
													<option value="">部门主管</option>
													<option value="">职员</option>
												</select>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<select class="form-control show-tick">
													<option value="">-- 职员状态 --</option>
													<option value="">试用期</option>
													<option value="">已转正</option>
													<option value="">已离职</option>
													<option value="">交接中</option>
												</select>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line">
												<select class="form-control show-tick">
													<option value="">-- 休假类型 --</option>
													<option value="">否</option>
													<option value="">婚嫁</option>
													<option value="">事假</option>
													<option value="">丧家</option>
													<option value="">产假</option>
													<option value="">陪产假</option>
													<option value="">年假</option>
													<option value="">病假</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="body">
								<div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-4 col-xs-offset-5">
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
								<table class="table table-striped">
									<thead>
										<tr>
											<th>#</th>
											<th>职员编号</th>
											<th>姓名</th>
											<th>性别</th>
											<th>部门</th>
											<th>职位</th>
											<th>身份证</th>
											<th>入职日期</th>
											<th>工龄</th>
											<th>社保日期</th>
											<th>公积金日期</th>
											<th>联系电话</th>
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
												<input class="form-control" type="text" value="" readonly/>
											</td>
											<td>
												<input class="form-control" type="text" value="" readonly/>
											</td>
											<td>
												<input class="form-control" type="text" value="" readonly/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="body">
								<div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-4 col-xs-offset-5">
									<button type="button" class="btn btn-raised btn-info m-t-15 waves-effect">预览</button>
									<button type="button" class="btn btn-raised btn-default m-t-15 waves-effect">打印</button>
									<button type="button" class="btn btn-raised btn-primary m-t-15 waves-effect">下载</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Jquery Core Js -->
		<script src="static/bundles/libscripts.bundle.js"></script>
		<!-- Lib Scripts Plugin Js ( jquery.v3.2.1, Bootstrap4 js) -->
		<script src="static/bundles/vendorscripts.bundle.js"></script>
		<!-- Lib Scripts Plugin Js -->

		<script src="static/plugins/autosize/autosize.js"></script>
		<!-- Autosize Plugin Js -->
		<script src="static/plugins/momentjs/moment.js"></script>
		<!-- Moment Plugin Js -->
		<script src="static/plugins/dropzone/dropzone.js"></script>
		<!-- Dropzone Plugin Js -->

		<!-- Bootstrap Material Datetime Picker Plugin Js -->
		<script src="static/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

		<script src="static/bundles/mainscripts.bundle.js"></script>
		<!-- Custom Js -->
		<script src="static/js/pages/forms/basic-form-elements.js"></script>
	</body>

</html>