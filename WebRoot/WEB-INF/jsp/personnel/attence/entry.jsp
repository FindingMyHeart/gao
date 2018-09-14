<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
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
		<title>考勤申请</title>
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
								<!-- 客户表的主键ID -->
								<input type="hidden" id="ATTENCE_ID" value="${pd.ATTENCE_ID}" v-model="ATTENCE_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<!-- 类型 -->
								<input type="hidden" id="attence_type" value="${pd.attence_type}" v-model="attence_type">

								<input type="hidden" id="STAFF_ID" value="${sessionScope.sessionUser.STAFF_ID}" v-model="STAFF_ID">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="职员编号" type="text" disabled value="${sessionScope.sessionUser.STAFF_CODE}" v-model="STAFF_CODE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="姓名" type="text" disabled value="${sessionScope.sessionUser.STAFF_NAME}" v-model="STAFF_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="部门" type="text" disabled value="${sessionScope.sessionUser.DEPT_NAME}" v-model="DEPT_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="职位" type="text" disabled value="${sessionScope.sessionUser.POST_NAME}" v-model="POST_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '1'">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="加班开始日期" v-model="JIABAN_START_DATE" id="JIABAN_START_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '1'">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="加班结束日期" v-model="JIABAN_END_DATE" id="JIABAN_END_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '2'">
										<div class="form-group">
											<input class="form-control" placeholder="加班剩余时长" type="text" disabled value="${sessionScope.sessionUser.JBSYSC}" v-model="JBSYSC" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '2'">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="调休开始日期" v-model="TIAOXIU_START_DATE" id="TIAOXIU_START_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '2'">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="调休结束日期" v-model="TIAOXIU_END_DATE" id="TIAOXIU_END_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '3'">
										<div class="form-group">
											<input class="form-control" placeholder="剩余年假时长！" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '3'">
										<select class="form-control show-tick" v-model="QINGJIA_TYPE" id="QINGJIA_TYPE" :disabled="type == 'view'">
											<option value="">-- 请假类别 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('xjlx')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '3'">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="请假开始日期" v-model="QINGJIA_START_DATE" id="QINGJIA_START_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="attence_type == '3'">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="请假结束日期" v-model="QINGJIA_END_DATE" id="QINGJIA_END_DATE" :disabled="type == 'view'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12" v-if="attence_type == '1'">
						<div class="card">
							<div class="header">
								<h2><strong>加班原因</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="JIABAN_REASON" :disabled="type == 'view'"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12" v-if="attence_type == '2'">
						<div class="card">
							<div class="header">
								<h2><strong>调休原因</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="TIAOXIU_REASON" :disabled="type == 'view'"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12" v-if="attence_type == '3'">
						<div class="card">
							<div class="header">
								<h2><strong>请假原因</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="QINGJIA_REASON" :disabled="type == 'view'"></textarea>
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
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button" data-widget="remove" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_entry.jsp"></jsp:include>

		<!-- js -->
		<script type="text/javascript" src="static/js/modules/personnel/attence/entry.js"></script>
	</body>

</html>