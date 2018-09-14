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
		<title>人事申请</title>
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
								<input type="hidden" id="TRANSFER_ID" value="${pd.TRANSFER_ID}" v-model="TRANSFER_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<!-- 类型 -->
								<input type="hidden" id="transfer_type" value="${pd.transfer_type}" v-model="transfer_type">
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
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="入职日期" type="text" disabled value="${sessionScope.sessionUser.JOIN_DATE}" v-model="JOIN_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="transfer_type == '1'">
										<div class="form-group">
											<input class="form-control" placeholder="应转正日期" type="text" disabled value="${sessionScope.sessionUser.ZHUANZHENG_DATE}" v-model="ZHUANZHENG_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group" v-if="transfer_type == '1'">
											<input class="form-control" placeholder="申请转正日期" type="text" disabled value="<%=now_date%>" v-model="CREATE_TIME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="transfer_type == '2'">
										<div class="form-group">
											<input class="form-control" placeholder="预计离职日期" type="text" v-model="LEAVE_DATE" id="LEAVE_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="transfer_type == '3'">
										<div class="form-group">
											<input class="form-control" placeholder="交接完成日期" type="text" v-model="JIAOJIE_FINISH_DATE" id="JIAOJIE_FINISH_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" v-if="transfer_type == '3'">
										<select class="form-control show-tick" v-model="STAFF_ID" id="JIAOJIE_TYPE" :disabled="type == 'view'">
											<option value="">-- 交接类型 --</option>
											<option value="1">无需交接</option>
											<option value="2">离职交接</option>
											<option value="3">调岗交接</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12" v-if="transfer_type == '1'">
						<div class="card">
							<div class="header">
								<h2><strong>试用期个人总结</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="PERSONAL_SUMMARY" :disabled="type == 'view'"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12" v-if="transfer_type == '2'">
						<div class="card">
							<div class="header">
								<h2><strong>离职原因</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="LEAVE_REASON" :disabled="type == 'view'"></textarea>
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
							<div class="body" id="file_xyf">
								<h2 class="card-inside-title">附件上传</h2>
								<div style="overflow: hidden;width: 100%;height: 40px;">
									<div style="float: left;width: 300px;margin: 10px auto;">
										<input name="file" type="file" id="id-input-file-1"/>
									</div>
									<div style="float: left;margin: 10px auto;">
										<a href="javascript:void(0)" onclick="uploadFileNew();" class="file_upload" style="color: #fff;padding: 5px 10px;border: 1px solid #999;background-color: #1f91f3 !important;border-radius: 3px;">上传</a>
									</div>
								</div>
								<div id="fileDiv">

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
		<jsp:include page="../../include/footer_new_entry.jsp"></jsp:include>

		<!-- js -->
		<script type="text/javascript" src="static/js/modules/personnel/transfer/entry.js"></script>
	</body>

</html>