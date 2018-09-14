<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html class="no-js " lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>Admin X管理系统</title>
		<link rel="icon" href="favicon.ico" type="image/x-icon">
		<!-- Favicon-->
		<link rel="stylesheet" href="static/plugins/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="static/plugins/morrisjs/morris.css" />
		<!-- Custom Css -->
		<link rel="stylesheet" href="static/css/main.css">
		<link rel="stylesheet" href="static/css/color_skins.css">
		<!-- 公共的样式 -->
		<link rel="stylesheet" href="static/css/common.css">
		<!-- layUI -->
		<link rel="stylesheet" href="static/plugins/layui/css/layui.css">
		<script type="text/javascript">
			layui.use('table', function() {
				var table = layui.table;
				table.render({
					elem: '#notice',
					url: 'json',
					cols: [
						[{
							type: 'numbers',
							fixed: 'left'
						}, {
							field: 'name',
							width: 180,
							title: '名称'
						}, {
							field: 'content',
							minwidth: 250,
							title: '内容',
							sort: true
						}, {
							field: 'state',
							width: 80,
							title: '状态'
						}, {
							field: 'date',
							title: '日期',
							minWidth: 150
						}, {
							fixed: 'right',
							width: 330,
							align: 'center',
							toolbar: '#barDemo',
							fixed: 'right'
						}]
					],
					page: true
				});
			});
		</script>
	</head>

	<body class="theme-black">

		<!-- Main Content -->
		<section class="content-home">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row clearfix">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>Admin X</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item active">指示板</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="row clearfix">
					<div class="col-lg-3 col-md-6">
						<div class="card">
							<div class="body l-parpl text-center">
								<p class="m-b-20"><i class="zmdi zmdi-assignment-o zmdi-hc-3x"></i></p>
								<h3 class="m-b-0 m-t-10 text-white number count-to" data-from="0" data-to="20" data-speed="2000" data-fresh-interval="700">20</h3>
								<span class="text-white"><a href="">我的申请</a></span>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="card">
							<div class="body l-seagreen text-center">
								<p class="m-b-20"><i class="zmdi zmdi-chart zmdi-hc-3x"></i></p>
								<h3 class="m-b-0 m-t-10 text-white number count-to" data-from="0" data-to="10" data-speed="2000" data-fresh-interval="700">10</h3>
								<span class="text-white"><a href="">我的审批</a></span>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="card">
							<div class="body l-amber text-center">
								<p class="m-b-20"><i class="zmdi zmdi-email zmdi-hc-3x"></i></p>
								<h3 class="m-b-0 m-t-10 text-white number count-to" data-from="0" data-to="5" data-speed="2000" data-fresh-interval="700">5</h3>
								<span class="text-white"><a href="">我的邮件</a></span>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="card">
							<div class="body l-blue text-center">
								<p class="m-b-20"><i class="zmdi zmdi-collection-text zmdi-hc-3x"></i></p>
								<h3 class="m-b-0 m-t-10 text-white number count-to" data-from="0" data-to="100" data-speed="2000" data-fresh-interval="700">100</h3>
								<span class="text-white"><a href="">我的报告</a></span>
							</div>
						</div>
					</div>
				</div>

				<!-- notice -->
				<div class="row clearfix">
					<div class="col-lg-12">
						<div class="card">
							<div class="header">
								<h2><strong>通知详情</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="layui-hide" id="notice"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-danger btn-xs">已读</button>
										<button type="button" class="btn btn-info btn-xs">详细</button>
									</script>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- #END# notice -->
			</div>
		</section>
		<!-- Jquery Core Js -->
		<script src="static/bundles/libscripts.bundle.js"></script>
		<!-- Lib Scripts Plugin Js ( jquery.v3.2.1, Bootstrap4 js) -->
		<script src="static/bundles/vendorscripts.bundle.js"></script>
		<!-- slimscroll, waves Scripts Plugin Js -->

		<script src="static/bundles/jvectormap.bundle.js"></script>
		<!-- JVectorMap Plugin Js -->
		<script src="static/bundles/morrisscripts.bundle.js"></script>
		<!-- Morris Plugin Js -->

		<!-- layUI -->
		<script src="static/plugins/layui/layui.js"></script>
		<script src="static/bundles/mainscripts.bundle.js"></script>
		<script src="static/js/pages/index.js"></script>

		<!-- Js -->
		<script type="text/javascript" src="static/js/modules/main.js"></script>
	</body>

</html>