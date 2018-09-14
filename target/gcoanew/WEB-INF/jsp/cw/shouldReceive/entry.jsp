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
<!doctype html>
<html class="no-js " lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>应收款单</title>
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
								<input type="hidden" id="PROJECT_ID" value="${pd.PROJECT_ID}" v-model="PROJECT_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目编号!" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目名称" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="部门" type="text" value="${sessionScope.sessionUser.DEPT_NAME}" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请人" type="text" value="${sessionScope.sessionUser.STAFF_NAME}" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请日期" type="text" value="<%= now_date%>" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick">
											<option>发票内容!</option>
											<option value="">设备费</option>
											<option value="">维修费</option>
											<option value="">技术服务费</option>
											<option value="">维保费</option>
											<option value="">工程款</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" disabled>
											<option>发票类型!</option>
											<option value="">普票</option>
											<option value="">专票</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" disabled>
											<option value="">税率!</option>
											<option value="">3%</option>
											<option value="">6%</option>
											<option value="">11%</option>
											<option value="">17%</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20" disabled>
										<div class="form-group">
											<input class="form-control" placeholder="金额!" type="text">
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
								<h2><strong>发票信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" disabled>
											<option>开票名称!</option>
											<option>项目A</option>
											<option>项目B</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="社会统一信用代码!" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="开户行!" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="账号!" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="地址!" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="电话!" type="text" disabled>
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
								<h2><strong>收款信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="ADD_PAYMENT_MODE">
                                            <option value="">-- 结算方式 --</option>
                                            <c:forEach var="p" items="${fns:getDicListByType('fkfs')}">
                                                <option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="ADD_ACCOUNT_ID">
                                            <option value="">-- 结算账户 --</option>
                                            <c:forEach var="p" items="${fns:getAllAccountList()}">
                                                <option value="${p.ACCOUNT_ID }">${p.ACCOUNT_NAME }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="结算金额" type="text" v-model="ADD_ACCOUNT_MONEY">
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
							<div class="header">
								<h2><strong>文件附件</strong></h2>
							</div>
							<div class="body">
								<form action="/" id="frmFileUpload" class="dropzone" method="post" enctype="multipart/form-data">
									<div class="dz-message">
										<div class="drag-icon-cph"> <i class="material-icons">touch_app</i> </div>
										<h3>拖放文件或点击上传.</h3>
										<em>(Drop <strong>files</strong> here or click to upload.)</em> 
									</div>
									<div class="fallback">
										<input name="file" type="file" multiple />
									</div>
								</form>
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
        <script type="text/javascript" src="static/js/modules/cw/shouldReceive/entry.js"></script>
	</body>

</html>