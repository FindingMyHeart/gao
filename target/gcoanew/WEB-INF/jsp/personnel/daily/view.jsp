<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
    java.text.SimpleDateFormat simpleDateFormat = new java.text.SimpleDateFormat(
            "yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();
    String now_date = simpleDateFormat.format(currentTime).toString();
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>工作报告</title>
		<jsp:include page="../../include/top.jsp"></jsp:include>
		<!-- sweetAlert -->
		<link rel="stylesheet" href="static/plugins/sweetalert/sweetalert.css">
		<script type="text/javascript" src="static/plugins/sweetalert/sweetalert.min.js"></script>
		<!-- vue -->
		<script type="text/javascript" src="static/js/vue.js"></script>
		<!-- 公共的样式 -->
		<link rel="stylesheet" href="static/css/common.css">
	</head>

	<body class="theme-blue">
		<!-- main content -->
		<section class="content-all" id="entry_body">
			<div class="container-fluid">
				<div class="block-header">
					<h2>工作报告</h2>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<a href="index.html">首页</a>
						</li>
						<li class="breadcrumb-item active">日常管理</li>
					</ul>
				</div>
				<!-- Input -->
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="body">
								<h2 class="card-inside-title">工作报告</h2>
								<input type="hidden" id="DAILY_ID" value="${pd.DAILY_ID}" v-model="DAILY_ID">
								<div class="row clearfix">
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line focused">
												<input type="text" class="form-control" id="V_STAFF_NAME" v-model="V_STAFF_NAME" disabled="disabled" />
												<label class="form-label">姓名</label>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line focused">
												<input type="text" class="form-control" id="V_STAFF_CODE" v-model="V_STAFF_CODE" disabled="disabled" />
												<label class="form-label">职员编号</label>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line focused">
												<input type="text" class="form-control" id="V_DEPT_NAME" v-model="V_DEPT_NAME" disabled="disabled" />
												<label class="form-label">部门</label>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line focused">
												<input type="text" class="form-control" id="V_POST_NAME" v-model="V_POST_NAME" disabled="disabled" />
												<label class="form-label">职位</label>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
										<div class="form-group form-float">
											<div class="form-line focused">
												<input type="text" class="form-control" id="V_TX_DATE" v-model="V_TX_DATE" disabled="disabled" />
												<label class="form-label">日期</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="body">
								<h2 class="card-inside-title">工作内容</h2>
								<div class="row clearfix">
									<div class="col-sm-12 col-md-12 col-xs-12 col-gl-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="在此处输入今日工作内容..." id="V_TODAY_CONTENT" v-model="V_TODAY_CONTENT" disabled="disabled"></textarea>
											</div>
										</div>
									</div>
									<div class="col-sm-12 col-md-12 col-xs-12 col-gl-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="在此处输入明日工作计划..." id="V_TOMORROW_PLAN" v-model="V_TOMORROW_PLAN" disabled="disabled"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="body">
								<div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-4 col-xs-offset-5" style="margin-left: 0px;">
									<button type="button" class="btn btn-raised btn-defult m-t-15 waves-effect" data-widget="remove" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 引入录入的js -->
		<script type="text/javascript" src="static/js/modules/personnel/daily/view.js"></script>
	</body>

</html>