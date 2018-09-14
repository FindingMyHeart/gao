<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html class="no-js " lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>维修管理</title>
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
	</head>

	<body class="theme-black">

		<section class="content-modals">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>维修管理</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item active">售后管理</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card layListTable">
							<div class="header">
								<h2><strong>查询条件</strong></h2>
								<ul class="header-dropdown">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);">维修登记!</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="维修单号!" type="text">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" id="PROJECT_ID_SEARCH">
											<option value="">-- 项目名称 --</option>
											<c:forEach var="p" items="${fns:getAllShProjectList()}">
												<option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="PERSONNEL_NAME_SEARCH">
											<option value="">-- 维修人员 --</option>
											<c:forEach var="p" items="${fns:getAllShWxryList()}">
												<option value="${p.PERSONNEL_NAME }">${p.PERSONNEL_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="REPAIR_STATUS_SEARCH">
											<option value="">-- 维修状态 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('wxzt')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="报修日期" id="BAOXIU_TIME_SEARCH">
										</div>
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
									<table class="layui-hide table table-striped" id="afterSaleRepair" lay-filter="afterSaleRepair"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-info btn-xs" lay-event="detail">预览</button>
										<button type="button" class="btn btn-raised btn-success btn-xs waves-effect changButton" lay-event="edit">修改</button>

										<button type="button" class="btn btn-raised btn-danger btn-xs waves-effect changButton" lay-event="close">关闭</button>

										<button class="btn btn-success btn-xs" lay-event="edit" style="display: none">修改</button>
										<button class="btn btn-danger btn-xs" style="display: none">删除!</button>
										<button class="btn btn-info btn-xs" style="display: none">预览!</button>
										<button class="btn bg-deep-orange btn-xs" style="display: none">完成!</button>
										<button class="btn bg-black btn-xs" lay-event="close" style="display: none">关闭</button>
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
		<script type="text/javascript" src="static/js/modules/afterSale/wx/list.js"></script>
		<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
	</body>

</html>