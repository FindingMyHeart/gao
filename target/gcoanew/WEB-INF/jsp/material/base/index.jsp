<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html class="no-js" lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<title>物料信息库</title>
		<base href="<%=basePath%>">
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
		<!-- ztree -->
		<link rel="stylesheet" type="text/css" href="static/plugins/zTree/zTreeStyle/zTreeStyle.css" />
	</head>

	<body class="theme-black">

		<section class="content-modals">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>物料信息库</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item active">基础管理</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-3 col-md-3 col-sm-3">
						<div class="card">
							<div class="header">
								<h2><strong>物料分类</strong></h2>
								<ul class="header-dropdown">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);" @click="saveCategory">增加分类</a>
											</li>
											<li>
												<a href="javascript:void(0);" @click="editCategory">修改分类</a>
											</li>
											<li>
												<a href="javascript:void(0);" @click="deleteCategory">删除分类</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<ul id="ultree" class="ztree"></ul>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-9 col-md-9 col-sm-9">
						<div class="card materialTable">
							<div class="header">
								<h2><strong>查询条件</strong></h2>
								<ul class="header-dropdown">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);" @click="save">物料信息录入</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-3 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PID_SEARCH" id="pid_search">
											<c:forEach var="p" items="${fns:getMaterialCategoryForSelectTree()}">
												<option value="${p.id }">${p.name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-3 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="名称" type="text" id="material_name_search">
										</div>
									</div>
									<div class="col-md-4 col-lg-3 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="品牌" type="text" id="material_brand_search">
										</div>
									</div>
									<div class="col-md-4 col-lg-3 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="规格型号" type="text" id="material_spec_search">
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
						<div class="card">
							<div class="header">
								<h2><strong>查询结果</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="layui-hide table table-striped" id="material" lay-filter="material"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-info btn-xs" lay-event="detail">预览</button>
										<button type="button" class="btn btn-success btn-xs" lay-event="edit">修改</button>
										<button type="button" class="btn btn-danger btn-xs" lay-event="del">删除</button>
									</script>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_list.jsp"></jsp:include>
		<script type="text/javascript" src="static/plugins/zTree/jquery.ztree.all.min.js"></script>
		<!-- Js -->
		<script type="text/javascript" src="static/js/modules/material/index.js"></script>
		<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
	</body>

</html>