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
		<title>银行存取款登记</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
		<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>
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
									<input type="hidden" id="id" value="${id}">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="登记日期" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="备注" type="text" id="MEMO" up="up">
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
								<h2><strong>调出信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="TIAOCHU_BIZHONG">
                                            <option value="">-- 调出币种 --</option>
                                            <option value="美元">美元</option>
                                            <option value="欧元">欧元</option>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="调出汇率" type="text" id="TIAOCHU_HUILV" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="调出金额" type="text" id="TIAOCHU_MONEY" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="TIAOCHU_PAYMENT_MODE">
                                            <option value="">-- 付款方式 --</option>
                                            <option value="现金">现金</option>
                                            <option value="支票">支票</option>
                                            <option value="网银">网银</option>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="TIAOCHU_PAYMENT_ACCOUNTID">
                                            <option value="">-- 付款账户 --</option>
                                            <c:forEach var="p" items="${fns:getAllAccountList()}">
                                                <option value="${p.ACCOUNT_ID }">${p.ACCOUNT_NAME }</option>
                                            </c:forEach>
                                        </select>
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
								<h2><strong>调入信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="TIAORU_BIZHONG">
                                            <option value="">-- 调入币种 --</option>
                                            <option value="美元">美元</option>
                                            <option value="欧元">欧元</option>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="调入汇率" type="text" iid="TIAORU_HUILV" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="调入金额" type="text" id="TIAORU_MONEY" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="TIAORU_RECEIPT_MODE">
                                            <option value="">-- 收款方式 --</option>
                                            <option value="现金">现金</option>
                                            <option value="支票">支票</option>
                                            <option value="网银">网银</option>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										 <select class="form-control show-tick" id="TIAORU_RECEIPT_ACCOUNTID">
                                            <option value="">-- 收款账户 --</option>
                                            <c:forEach var="p" items="${fns:getAllAccountList()}">
                                                <option value="${p.ACCOUNT_ID }">${p.ACCOUNT_NAME }</option>
                                            </c:forEach>
                                        </select>
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
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" onclick="saveit()">保存</button>
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button" data-widget="remove" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_new_entry.jsp"></jsp:include>
		
		<!-- Js -->
		<script type="text/javascript" src="static/js/modules/cw/accessMoney/entry.js"></script>
	</body>

</html>