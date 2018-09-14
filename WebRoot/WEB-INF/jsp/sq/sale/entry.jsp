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
		<title>维修登记</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
	</head>

	<body class="theme-black">

		<section class="content-modals" id="entry_body">
			<div class="container-fluid">
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>销售信息</strong></h2>
							</div>
							<div class="body">
								<!-- 客户表的主键ID -->
								<input type="hidden" id="SALE_ID" value="${pd.SALE_ID}" v-model="SALE_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 进入类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="销售单号" type="text" disabled v-model="SALE_NO">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input type="text" class="form-control datetimepicker" placeholder="开票日期" v-model="SALE_TIME" id="SALE_TIME"  :disabled="type == 'view'"/>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="送货地址" type="text" v-model="SEND_ADDRESS" :disabled="type == 'view'"/>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="OUT_STORE" :disabled="type == 'view'">
											<option value="">-- 出货仓库 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('chck')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>

									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="收款期限" type="text" id="RECEIVE_PERIOD" v-model="RECEIVE_PERIOD" :disabled="type == 'view'">
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
								<h2><strong>购货方信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="单位" type="text" v-model="BUY_COMPANY" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="地址" type="text" v-model="BUY_COMPANY_ADDRESS" :disabled="type == 'view'">
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
								<h2><strong>出货方信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="单位" type="text"  v-model="OUT_COMPANY" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="地址" type="text"  v-model="OUT_COMPANY_ADDRESS" :disabled="type == 'view'">
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
								<h2><strong>货品明细</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>规格</th>
												<th>单位</th>
												<th>数量</th>
												<th>单价</th>
												<th>货款</th>
												<th>税率</th>
												<th>税金</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>规格</th>
												<th>单位</th>
												<th>数量</th>
												<th>单价</th>
												<th>货款</th>
												<th>税率</th>
												<th>税金</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in itemList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.ORDER_NO" />
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="名称" v-model="item.MATERIAL_NAME"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="规格" v-model="item.MATERIAL_SPEC"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="单位" v-model="item.MATERIAL_UNIT"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="数量" v-model="item.MATERIAL_NUM"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="单价" v-model="item.UNIT_PRICE"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="货款" v-model="item.GOOD_PRICE"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="税率" v-model="item.TAX_RATE"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" placeholder="税金" v-model="item.TAXATION"  :disabled="type == 'view'"/>
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
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合计金额" type="text"  v-model="HJJE" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="人民币大写" type="text"  v-model="RMBDX" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="仓管员" type="text"  v-model="STORE_MANAGER" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<select id="BUSINESS_USERID" class="form-control z-index show-tick" v-model="BUSINESS_USERID" :disabled="type == 'view'">
												<option value="">-- 业务员 --</option>
												<c:forEach var="p" items="${fns:getAllStaffList()}">
													<option value="${p.staff_id }">${p.staff_name }</option>
												</c:forEach>">
											</select>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<select id="OPEN_USERID" class="form-control z-index show-tick" v-model="OPEN_USERID" :disabled="type == 'view'">
												<option value="">-- 开单员 --</option>
												<c:forEach var="p" items="${fns:getAllStaffList()}">
													<option value="${p.staff_id }">${p.staff_name }</option>
												</c:forEach>">
											</select>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<select id="IF_INVOICE" class="form-control z-index show-tick" v-model="IF_INVOICE" :disabled="type == 'view'">
												<option value="">-- 是否开票 --</option>
												<option value="1">是</option>
												<option value="2">否</option>
											</select>
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
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" @click="save" v-if="type!='view'">保存</button>
									<c:if test="${pd.in_type == 'menu'}">
										<button class="btn btn-raised btn-default btn-round waves-effect" type="button" @click="cancel">取消</button>
									</c:if>
									<c:if test="${pd.in_type != 'menu'}">
										<button class="btn btn-raised btn-default btn-round waves-effect" type="button" data-widget="remove" id="entry_qx">取消</button>
									</c:if>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_new_entry.jsp"></jsp:include>

		<!-- js -->
		<script type="text/javascript" src="static/js/modules/sq/sale/entry.js"></script>
	</body>

</html>