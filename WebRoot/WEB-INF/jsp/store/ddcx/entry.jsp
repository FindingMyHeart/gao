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
		<title>${fns:getStoreIoNameById(pd.type)}</title>
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
								<input type="hidden" value="${pd.type}" v-model="IO_FLAG">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单日期" type="text" value="<%=now_date%>" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="制单人" type="text" disabled value="${sessionScope.sessionUser.STAFF_NAME}">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="接货人" type="text" v-model="JIEHUO_PERSON">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="审核人" type="text" v-model="SHENHE_PERSON">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="经手人" type="text" v-model="JINGSHOU_PERSON">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PROJECT_ID">
											<option value="">-- 项目名称 --</option>
											<c:forEach var="p" items="${fns:getAllProjectList()}">
												<option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
											</c:forEach>
										</select>
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
								<h2><strong>${fns:getStoreIoNameById(pd.type)}明细</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>系统名称</th>
												<th>供应商</th>
												<th>库位</th>
												<th>名称</th>
												<th>品牌</th>
												<th>规格型号</th>
												<th>单位</th>
												<th>数量</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>系统名称</th>
												<th>供应商</th>
												<th>库位</th>
												<th>名称</th>
												<th>品牌</th>
												<th>规格型号</th>
												<th>单位</th>
												<th>数量</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in itemList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.SUB_NO">
													</div>
												</td>
												<td>
													<select class="form-control show-tick" v-model="item.SYSTEM_NAME">
														<option value="">-- 系统名称 --</option>
														<c:forEach var="p" items="${fns:getDicListByType('xtmc')}">
															<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<select class="form-control z-index show-tick" data-live-search="true" v-model="item.SUPPLIER_ID">
														<option value="">-- 供应商 --</option>
														<c:forEach var="p" items="${fns:getAllGysList()}">
															<option value="${p.SUPPLIER_ID }">${p.SUPPLIER_NAME }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<select class="form-control show-tick" v-model="item.LOCATION_ID">
														<option value="">-- 库位 --</option>
														<c:forEach var="p" items="${fns:getAllKwList()}">
															<option value="${p.LOCATION_ID }">${p.LOCATION_NAME }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<select class="form-control z-index show-tick" data-live-search="true" onchange="changeMc('{{index}}',this)">
														<option>-- 名称 --</option>
														<c:forEach var="p" items="${fns:getAllMaterialList()}">
															<option value="${p.MATERIAL_ID }" title="${p.MATERIAL_BRAND}-${p.MATERIAL_SPEC}-${p.MATERIAL_UNIT}">${p.MATERIAL_NAME }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" value="" v-model="item.MATERIAL_BRAND">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" value="" v-model="item.MATERIAL_SPEC">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" value="" v-model="item.MATERIAL_UNIT">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="number" value="1" v-model="item.MATERIAL_NUM">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" value="" v-model="item.MEMO">
													</div>
												</td>
												<td>
													<button class="btn btn-danger btn-raised btn-round" @click="deleteThis(index)">删除</button>
												</td>
											</tr>
											<tr>
												<td></td>
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
													<button class="btn btn-warning btn-raised btn-round" @click="addOne">增加</button>
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
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button" @click="cancel">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_new_entry.jsp"></jsp:include>

		<!-- js -->
		<script type="text/javascript" src="static/js/modules/store/ddcx/entry.js"></script>
	</body>

</html>