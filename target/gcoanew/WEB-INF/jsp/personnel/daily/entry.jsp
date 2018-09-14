<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
    java.text.SimpleDateFormat simpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();
    String now_date = simpleDateFormat.format(currentTime).toString();
%>
<!DOCTYPE html>
<html class="no-js " lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>工作报告</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
	</head>

    <body class="theme-black">

		<section class="content-modals" id="entry_body">
			<div class="container-fluid">
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>基本信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">

									<!-- 类型 -->
									<input type="hidden" name="DAILY_TYPE" id="DAILY_TYPE" value="${pd.DAILY_TYPE}" v-model="DAILY_TYPE"/>
									<!-- 主键ID -->
									<input type="hidden" name="DAILY_TYPE" id="DAILY_ID" value="${pd.DAILY_ID}" v-model="DAILY_ID"/>
									<!-- type -->
									<input type="hidden" name="type" id="type" value="${pd.type}" v-model="type"/>

									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="职员编号" type="text" value="${sessionScope.sessionUser.STAFF_CODE}" disabled="disabled" v-model="V_STAFF_CODE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="姓名" type="text" value="${sessionScope.sessionUser.STAFF_NAME}" disabled="disabled" v-model="V_STAFF_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="部门" type="text" value="${sessionScope.sessionUser.DEPT_NAME}" disabled="disabled" v-model="V_DEPT_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="职位" type="text" value="${sessionScope.sessionUser.POST_NAME}" disabled="disabled" v-model="V_POST_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="日期" type="text" value="<%=now_date%>" disabled="disabled" v-model="V_TX_DATE">
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
							<div class="header">
								<h2><strong v-text="NAME1">今日（本周、本月）工作内容</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="工作内容..." v-model="TODAY_CONTENT"></textarea>
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
							<div class="header">
								<h2><strong v-text="NAME2">今日（本周、本月）工作内容</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="计划内容..." v-model="TOMORROW_PLAN"></textarea>
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
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" @click="save" v-if="type != 'view'">保存</button>
									<button class="btn btn-raised btn-default btn-round waves-effect " type="button" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_new_entry.jsp"></jsp:include>
		
		<!-- js -->
		<script type="text/javascript" src="static/js/modules/personnel/daily/entry.js"></script>
	</body>

</html>