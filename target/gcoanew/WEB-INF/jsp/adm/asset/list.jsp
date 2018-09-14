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
		<base href="<%=basePath%>">
		<title>资产管理</title>
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
	</head>

	<body class="theme-black">
        
		<section class="content-modals">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>资产管理</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item">
									<a href="javascript:void(0);">行政管理</a>
								</li>
								<li class="breadcrumb-item active">资产管理</li>
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
												<a href="javascript:void(0);" @click="save">资产登记</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="资产编号" type="text" id="ASSET_CODE_SEARCH">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="资产名称" type="text" id="ASSET_NAME_SEARCH">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="DEPT_ID_SEARCH">
											<option value="">-- 所属部门 --</option>
											<c:forEach var="p" items="${fns:getAllBmList()}">
												<option value="${p.DEPT_ID }">${p.DEPT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="所属人" type="text" id="USER_NAME_SEARCH">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="ASSET_TYPE_SEARCH">
											<option value="">-- 资产类型 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('zcfl')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="STATUS_SEARCH">
											<option value="">-- 资产状态 --</option>
											<option value="1">正常</option>
											<option value="2">报废</option>
											<option value="3">变卖</option>
											<option value="4">丢失</option>
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
									<table class="layui-hide table table-striped" id="layList" lay-filter="layList"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-success btn-xs" lay-event="edit">修改</button>
										<button type="button" class="btn btn-info btn-xs" lay-event="detail">预览</button>
										<button type="button" class="btn btn-primary btn-xs" style="display: none;">下载</button>
										{{# if(d.STATUS == "1"){ }}
										<button type="button" class="btn bg-purple btn-xs" lay-event="scrap">报废</button>
										<button type="button" class="btn bg-lime btn-xs" lay-event="sell_off">变卖</button>
										<button type="button" class="btn bg-pink btn-xs" lay-event="lose">丢失</button>
										{{# } }}
									</script>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_list.jsp"></jsp:include>

		<!-- js -->
		<script type="text/javascript" src="static/js/modules/adm/asset/list.js"></script>
		<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
	</body>

</html>