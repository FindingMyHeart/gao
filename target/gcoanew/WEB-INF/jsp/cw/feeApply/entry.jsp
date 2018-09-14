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
		<title>费用申请</title>
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
								<input type="hidden" id="FEE_ID" value="${pd.FEE_ID}" v-model="FEE_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号" type="text" disabled v-model="FEE_SN">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="部门" type="text" disabled v-model="DEPT_NAME" value="${sessionScope.sessionUser.DEPT_NAME}">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请人" type="text" disabled v-model="CREATE_USERNAME" value="${sessionScope.sessionUser.STAFF_NAME}">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请日期" type="text" disabled v-model="CREATE_DATE" value="<%=now_date%>">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" v-model="FEE_TYPE" :disabled="type == 'view' || type == 'addInfo'">
											<option value="1">通用</option>
											<option value="2">施工费</option>
											<option value="3">采购付款</option>
											<option value="4">借款</option>
											<option value="5">报销</option>
											<option value="6">差旅费</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="PAYMENT_MODE" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 付款方式 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('fkfs')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="金额" type="text" v-model="AMOUNT_MONEY" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="用途" type="text" v-model="PURPOSE" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="开户行" type="text" v-model="KAIHU_BANK" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="账号名称" type="text" v-model="ACCOUNT_NAME" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="账号" type="text" v-model="BANK_ACCOUNT" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--选择施工费显示-->
				<div class="row clearfix" v-if="FEE_TYPE == '2'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>施工费</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PROJECT_ID" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 项目名称 --</option>
											<c:forEach var="p" items="${fns:getAllProjectList()}">
												<option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="SHIGONGDUI" :disabled="type == 'view' || type == 'addInfo'">
											<option>施工队名称!</option>
											<option>项目A</option>
											<option>项目B</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="施工费造价" type="text" disabled v-model="SGZZJ" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix" v-if="FEE_TYPE == '2'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>已拨款</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>开户行</th>
												<th>账户名称</th>
												<th>账号</th>
												<th>金额</th>
												<th>支付方式</th>
												<th>用途</th>
												<th>日期</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>开户行</th>
												<th>账户名称</th>
												<th>账号</th>
												<th>金额</th>
												<th>支付方式</th>
												<th>用途</th>
												<th>日期</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr>
												<td>1</td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<button class="btn btn-success btn-raised btn-round">修改</button>
													<button class="btn btn-danger btn-raised btn-round">删除</button>
													<button class="btn btn-warning btn-raised btn-round">增加</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix" v-if="FEE_TYPE == '2'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>拨款明细</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="已拨款金额！" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="已拨款比例！" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="本次拨款比例！" type="text" disabled>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--选择施工费显示-->
				<!--选择采购付款显示-->
				<div class="row clearfix" v-if="FEE_TYPE == '3'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>采购付款</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PROJECT_ID" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 项目名称 --</option>
											<c:forEach var="p" items="${fns:getAllProjectList()}">
												<option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="BUY_SUPPLIER_ID" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 供应商 --</option>
											<c:forEach var="p" items="${fns:getAllGysList()}">
												<option value="${p.SUPPLIER_ID }">${p.SUPPLIER_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="BUY_CONTRACT_NO" id="BUY_CONTRACT_NO" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 采购合同编号 --</option>
											<option v-for="contract in BUY_CONTRACT_LIST" value="{{contract.CONTRACT_NO}}" title="{{contract.CONTRACT_ID}}">{{contract.CONTRACT_NAME}}</option>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同金额" type="text" disabled v-model="CONTRACT_PRICE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="总欠款金额！" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="BUY_FEE_TYPE" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 付款类型 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('fklb')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="BUY_INVOICE_TYPE" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 票据类型 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('pjlx')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--选择采购付款显示-->
				<!--选择借款显示-->
				<div class="row clearfix" v-if="FEE_TYPE == '4'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>借款</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="实际金额" type="text" v-model="BORROW_REAL_MONEY" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="退回金额" type="text" v-model="BORROW_BACK_MONEY" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="补领金额" type="text" v-model="BORROW_BU_MONEY" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--选择借款显示-->
				<!--选择报销显示-->
				<div class="row clearfix" v-if="FEE_TYPE == '5'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>报销</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="BAOXIAO_TYPE" :disabled="type == 'view' || type == 'addInfo'">
											<option value="">-- 报销项目 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('bxxm')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="票据张数" type="text" v-model="BAOXIAO_INVOICE_NUM" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--选择报销显示-->
				<!--选择差旅费显示-->
				<div class="row clearfix" v-show="FEE_TYPE == '6'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>差旅费</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="出差地点" type="text" v-model="CHAILV_LOCATION" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="出发地点" type="text" v-model="CHAILV_START_LOCATION" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="出发日期" v-model="CHAILV_START_DATE" id="CHAILV_START_DATE" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="到达地点" type="text" v-model="CHAILV_END_LOCATION" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="到达日期" v-model="CHAILV_END_DATE" id="CHAILV_END_DATE" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="人数" type="text" v-model="CHAILV_PERSON_NUM" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="天数" type="text" v-model="CHAILV_DAY_NUM" :disabled="type == 'view' || type == 'addInfo'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--选择差旅费显示-->
				<!--财务添加内容-->
				<div class="row clearfix" v-if="type == 'addInfo'">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>付款信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号！" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="ADD_PAYMENT_MODE">
											<option value="">-- 支付方式 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('fkfs')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="CW_KAIHU_BANK">
											<option value="">-- 支付账号开户行 --</option>
											<c:forEach var="p" items="${fns:getAllKhhList()}">
												<option value="${p.KAIHU_BANK }">${p.KAIHU_BANK }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="ADD_ACCOUNT_ID">
											<option value="">-- 支付账号 --</option>
											<option value="{{item.ACCOUNT_ID}}" v-for="item in CW_ACCOUNT_LIST">{{item.BANK_ACCOUNT}}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--财务添加内容-->
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

		<!-- 引入js -->
		<script type="text/javascript" src="static/js/modules/cw/feeApply/entry.js"></script>
	</body>

</html>