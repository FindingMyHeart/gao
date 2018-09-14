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
		<title>采购申请</title>
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
								<input type="hidden" id="OTHER_BUY_ID" value="${pd.OTHER_BUY_ID}" v-model="OTHER_BUY_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 进入类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="BUY_TYPE">
											<option value="">-- 采购类型 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('cglx')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="采购单号" type="text" disabled v-model="BUY_SN">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<select class="form-control show-tick" v-model="DEPT_ID">
												<option value="">-- 采购部门 --</option>
												<c:forEach var="p" items="${fns:getAllBmList()}">
													<option value="${p.DEPT_ID }">${p.DEPT_NAME }</option>
												</c:forEach>
											</select>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<c:if test="${pd.type == 'save'}">
												<input type="text" class="form-control" disabled="disabled" v-model="APPLY_NAME" value="${sessionScope.sessionUser.STAFF_NAME}" placeholder="申请人">
											</c:if>
											<c:if test="${pd.type != 'save'}">
												<input type="text" class="form-control" disabled="disabled" v-model="APPLY_NAME" placeholder="申请人">
											</c:if>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<c:if test="${pd.type == 'save'}">
												<input type="text" class="datepicker form-control" value="<%=now_date%>" disabled="disabled" placeholder="采购日期" v-model="CREATE_DATE">
											</c:if>
											<c:if test="${pd.type != 'save'}">
												<input type="text" class="datepicker form-control" disabled="disabled" placeholder="采购日期" v-model="CREATE_DATE">
											</c:if>
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
								<h2><strong>采购清单</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>品牌</th>
												<th>规格型号</th>
												<th>单位</th>
												<th>单价</th>
												<th>数量</th>
												<th>金额</th>
												<th>备注</th>
												<th v-if="type != 'view'">>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>品牌</th>
												<th>规格型号</th>
												<th>单位</th>
												<th>单价</th>
												<th>数量</th>
												<th>金额</th>
												<th>备注</th>
												<th v-if="type != 'view'">>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in itemList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.ORDER_NO">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" v-model="item.NAME">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.BRAND">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.SPEC">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.UNIT">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.NUM">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.UNIT_PRICE">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.TOTAL_PRICE">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.MEMO">
													</div>
												</td>
												<td v-if="type != 'view'">
													<button class="btn btn-danger btn-raised btn-round" @click="deleteThis(index)">删除</button>
												</td>
											</tr>
											<tr v-if="type!='view'">
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<button class="btn btn-warning btn-raised btn-round" @click="addContact">增加</button>
												</td>
											</tr>
										</tbody>
									</table>
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
		<script type="text/javascript" src="static/js/modules/project/buy/other_buy_entry.js"></script>
	</body>

</html>