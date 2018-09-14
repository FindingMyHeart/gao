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
		<base href="<%=basePath%>">
		<title>费用支出</title>
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
	</head>

	<body class="theme-black">

		<section class="content-modals">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>费用支出</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item">
									<a href="javascript:void(0);">财务管理</a>
								</li>
								<li class="breadcrumb-item active">资金管理</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card layListTable">
							<div class="header">
								<h2><strong>查询条件</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号" type="text" id="FEE_SN_SEARCH">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="DEPT_ID_SEARCH">
											<option value="">-- 部门 --</option>
											<c:forEach var="p" items="${fns:getAllBmList()}">
												<option value="${p.DEPT_ID }">${p.DEPT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="CREATE_USERID_SEARCH">
											<option value="">-- 申请人 --</option>
											<c:forEach var="p" items="${fns:getAllStaffList()}">
												<option value="${p.staff_id }">${p.staff_name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="FEE_TYPE_SEARCH">
											<option value="">-- 申请类型 --</option>
											<option value="1">通用</option>
											<option value="2">施工费</option>
											<option value="3">借款</option>
											<option value="4">报销</option>
											<option value="5">差旅费</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="申请日期" id="CREATE_DATE_SEARCH">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="CAIWU_STATUS_SEARCH">
											<option value="">-- 财务状态 --</option>
											<option value="1">新建</option>
											<option value="2">完成</option>
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
										<!--财务显示-->
										<button type="button" class="btn bg-pink btn-xs" lay-event="addInfo">添加</button>
										<!--财务显示-->
										<!--申请人显示-->
										{{# if(d.CAIWU_STATUS == "1"){ }}
										<button type="button" class="btn btn-default btn-xs" lay-event="complete">完成</button>
										{{# } }}
										<!--申请人显示-->
										<button type="button" class="btn btn-info btn-xs" style="display: none;">预览</button>
										<button type="button" class="btn btn-primary btn-xs" style="display: none;">下载</button>
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
		<script type="text/javascript" src="static/js/modules/cw/feePay/list.js"></script>
        <script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
	</body>

</html>