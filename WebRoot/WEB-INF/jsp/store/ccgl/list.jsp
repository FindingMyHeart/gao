<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
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
		<title>仓储查询</title>
		<base href="<%=basePath%>">
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
	</head>

	<body class="theme-black">

		<section class="content-modals">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>仓储查询</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item active">仓储管理</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card layListTable">
							<div class="header">
								<h2><strong>查询条件</strong></h2>
								<ul class="header-dropdown" style="display: none;">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);">入库!</a>
											</li>
											<li>
												<a href="javascript:void(0);">出库!</a>
											</li>
											<li>
												<a href="javascript:void(0);">退库!</a>
											</li>
											<li>
												<a href="javascript:void(0);">特殊入库!</a>
											</li>
											<li>
												<a href="javascript:void(0);">特殊出库!</a>
											</li>
											<li>
												<a href="javascript:void(0);">报废!</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="LOCATION_ID_SEARCH">
											<option value="">-- 库位 --</option>
											<c:forEach var="p" items="${fns:getAllKwList()}">
												<option value="${p.LOCATION_ID }">${p.LOCATION_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick">
											<option>库存类型！</option>
											<option>一般库存</option>
											<option>滞留库存</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick">
											<option>库存状态！</option>
											<option>全新</option>
											<option>旧物</option>
											<option>报废</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true">
											<option>项目名称！</option>
											<option>项目A</option>
											<option>项目B</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick">
											<option>系统名称！</option>
											<option>综合布线</option>
											<option>计算机网络</option>
											<option>安防监控</option>
											<option>消防广播及背景音乐</option>
											<option>智能对讲</option>
											<option>整体机房</option>
											<option>巡更</option>
											<option>智能家居</option>
											<option>停车场管理</option>
											<option>门禁一卡通</option>
											<option>LED及大屏幕显示</option>
											<option>有线电视及卫星接收</option>
											<option>楼宇自控</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true">
											<option>供应商！</option>
											<option>项目A</option>
											<option>项目B</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="名称！" type="text">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true">
											<option>品牌！</option>
											<option>项目A</option>
											<option>项目B</option>
										</select>
									</div>

									<div class="col-sm-12">
										<div class="form-group form-float">
											<button type="button" class="btn btn-raised btn-primary btn-round waves-effect" data-type="reload">查询</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12">
						<div class="card">
							<div class="header">
								<h2><strong>查询结果</strong></h2>
								<ul class="header-dropdown">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);" onclick="hzxz();">汇总下载</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="layui-hide table table-striped" id="ccgl" lay-filter="ccgl"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-info btn-xs" lay-event="detail">预览</button>
										<button type="button" class="btn btn-raised btn-success btn-xs" lay-event="edit">修改</button>
										<button type="button" class="btn btn-raised btn-danger btn-xs" lay-event="del">删除</button>
									</script>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_list.jsp"></jsp:include>

		<!-- Js -->
		<script type="text/javascript" src="static/js/modules/store/ccgl/list.js"></script>
		<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
	</body>

</html>