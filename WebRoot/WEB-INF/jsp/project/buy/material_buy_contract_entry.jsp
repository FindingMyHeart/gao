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
		<title>采购合同登记</title>
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
                                <input type="hidden" id="CONTRACT_ID" value="${pd.CONTRACT_ID}" v-model="CONTRACT_ID">
                                <!-- 类型 -->
                                <input type="hidden" id="type" value="${pd.type}" v-model="type">
                                <!-- 进入类型 -->
                                <input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<c:if test="${pd.type == 'save'}">
                                            <input type="text" class="form-control" placeholder="建档人" disabled="disabled"  value="${sessionScope.sessionUser.STAFF_NAME}" v-model="STAFF_NAME">
                                            </c:if>
                                            <c:if test="${pd.type != 'save'}">
                                            <input type="text" class="form-control" placeholder="建档人" disabled="disabled"  v-model="STAFF_NAME">
                                            </c:if>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<c:if test="${pd.type == 'save'}">
                                            <input type="text" class="datepicker form-control" value="<%=now_date%>" disabled="disabled" placeholder="建档日期" v-model="CREATE_DATE"/>
                                            </c:if>
                                            <c:if test="${pd.type != 'save'}">
                                            <input type="text" class="datepicker form-control" disabled="disabled" placeholder="建档日期" v-model="CREATE_DATE" />
                                            </c:if>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同编号!" type="text">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同名称" type="text" v-model="CONTRACT_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="合同日期" id="CONTRACT_DATE" v-model="CONTRACT_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="买方" type="text" v-model="BUYER_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PROJECT_ID">
											<option value="" >-- 项目名称 --</option>
                                            <c:forEach var="p" items="${fns:getAllProjectList()}">
                                                <option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
                                            </c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true"  v-model="SUPPLIER_ID">
											<option value="" >-- 供应商 --</option>
                                            <c:forEach var="p" items="${fns:getAllGysList()}">
                                                <option value="${p.SUPPLIER_ID }">${p.SUPPLIER_NAME }</option>
                                            </c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同金额" type="text" v-model="CONTRACT_PRICE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
									    <select class="form-control show-tick">
											<option>付款方式！</option>
											<option>现金</option>
											<option>转账</option>
											<option>支票</option>
										 </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
									    <select class="form-control show-tick" v-model="BILL_TYPE">
											<option value="" >-- 票据类型 --</option>
                                            <c:forEach var="p" items="${fns:getDicListByType('pjlx')}">
                                                <option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
                                            </c:forEach>
										 </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="备注" type="text" v-model="MEMO">
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
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" @click="save" v-if="type!='view'">保存</button>
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
        <script type="text/javascript" src="static/js/modules/project/buy/material_buy_contract_entry.js"></script>
	</body>

</html>