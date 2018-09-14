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
		<title>采购订单</title>
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
							    <!-- 申购订单的主键ID -->
                                <input type="hidden" id="APPLYBUY_ID" value="${pd.APPLYBUY_ID}" v-model="APPLYBUY_ID">
                                <!-- 申购订单的主键ID -->
                                <input type="hidden" id="type" value="${pd.type}" v-model="type">
                                <!-- 申购订单的主键ID -->
                                <input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<!-- 采购订单的主键ID -->
								<input type="hidden" id="BUY_ID" value="${pd.BUY_ID}" v-model="BUY_ID"/>
                                <!-- 当前登录用户 -->
                                <input type="hidden" id="user_name" value="${sessionScope.sessionUser.STAFF_NAME}">
                                <!-- 当前的时间 -->
                                <input type="hidden" id="now_date" value="<%=now_date%>">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="采购单号" type="text" disabled v-model="BUY_SN">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申购单号" type="text" disabled v-model="APPLYBUY_SN">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目名称" type="text" disabled v-model="PROJECT_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申购人" type="text" disabled v-model="APPLY_USER_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="采购人" type="text" disabled v-model="BUY_USER_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申购日期" type="text" disabled v-model="APPLY_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="采购日期" type="text" disabled v-model="BUY_DATE">
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
							<div class="body">
								<div class="panel-group" id="shoufengqing">
									<div class="panel panel-default" v-for="(index,item) in itemList">
										<div data-parent="#shoufengqing" data-toggle="collapse" data-target="#div1" class="panel-heading active">
											<h3 class="panel-title" style="height: 40px;overflow: hidden;line-height: 40px;margin: 0px 5px;">
												<div style="float:left;width:60%">采购信息{{index + 1}}</div>
												<div style="float:left;width:40%;text-align: right;"  v-if="type != 'view'">
													<button class="btn btn-raised btn-danger btn-xs waves-effect" style="float: right;height: 20px;line-height: 20px;padding: 0px 10px;" @click="deleteThis(index)">删除</button>
													<%--<a href="javascript:void(0);" class="btn btn-raised btn-error m-t-15 waves-effect" @click="deleteThis({{index}})">删除</a>--%>
												</div>
											</h3>
										</div>
										<div id="div1" class="collapse in" style="display: block;">
											<div class="panel-body">
												<table id="table_report11" class="table table-striped table-bordered table-hover">
													<tr>
														<td colspan="4" style="text-align: center;font-weight: bolder;">申购信息（可以不选）</td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">选择申购：</td>
														<td style="max-width: 248px;">
															<select class="form-control" v-model="item.APPLYBUY_DETAIL_ID" @change="changeApplyDetail(index)" style="width: 230px;" :disabled="type == 'view'">
																<option value="">-- 名称 --</option>
																<option v-for="single in applyDetailList" value="{{single.APPLYBUY_DETAIL_ID}}">{{single.SUB_NO}}-{{single.MATERIAL_NAME}}</option>
															</select>
														</td>
														<td style="width:100px;text-align: right;padding-top: 13px;">系统名称：</td>
														<td style="width: 42%;">

															<span v-text="item.APPLY_SYSTEM_NAME"></span>

														</td>


													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">名称：</td>
														<td><span v-text="item.APPLY_MATERIAL_NAME"></span></td>
														<td style="width:100px;text-align: right;padding-top: 13px;">品牌：</td>
														<td><span v-text="item.APPLY_MATERIAL_BRAND"></span></td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">规格：</td>
														<td><span v-text="item.APPLY_MATERIAL_SPEC"></span></td>
														<td style="width:100px;text-align: right;padding-top: 13px;">单位：</td>
														<td><span v-text="item.APPLY_MATERIAL_UNIT"></span></td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">数量：</td>
														<td><span v-text="item.APPLY_MATERIAL_NUM"></span></td>
														<td style="width:100px;text-align: right;padding-top: 13px;">备注：</td>
														<td><span v-text="item.APPLY_MEMO"></span></td>
													</tr>
												</table>

												<table id="table_report12" class="table table-striped table-bordered table-hover">
													<tr>
														<td colspan="4" style="text-align: center;font-weight: bolder;">采购信息</td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">供应商：</td>
														<td>
															<select class="form-control show-tick" v-model="item.SUPPLIER_ID" :disabled="type == 'view'">
																<option value="">-- 供应商 --</option>
																<c:forEach var="p" items="${fns:getAllGysList()}">
																	<option value="${p.SUPPLIER_ID }">${p.SUPPLIER_NAME }</option>
																</c:forEach>
															</select>
														</td>
														<td style="width:100px;text-align: right;padding-top: 13px;">名称：</td>
														<td>
															<select class="form-control show-tick" onchange="changeMc('{{index}}',this)" v-model="item.MATERIAL_ID" :disabled="type == 'view'">
																<option value="">--名称--</option>
																<c:forEach var="p" items="${fns:getAllMaterialList()}">
																	<option value="${p.MATERIAL_ID }" title="${p.MATERIAL_BRAND}-${p.MATERIAL_SPEC}-${p.MATERIAL_UNIT}">${p.MATERIAL_NAME }</option>
																</c:forEach>
															</select>
														</td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">品牌：</td>
														<td><span v-text="item.BUY_MATERIAL_BRAND" :disabled="type == 'view'"></span></td>
														<td style="width:100px;text-align: right;padding-top: 13px;">规格型号：</td>
														<td><span v-text="item.BUY_MATERIAL_SPEC" :disabled="type == 'view'"></span></td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">单位：</td>
														<td><span v-text="item.BUY_MATERIAL_UNIT" :disabled="type == 'view'"></span></td>
														<td style="width:100px;text-align: right;padding-top: 13px;">采购数量：</td>
														<td>
                                                            <input class="form-control" placeholder="这里输入采购数量" type="text" v-model="item.MATERIAL_NUM" :disabled="type == 'view'"/>
                                                            <%--<input type="text"  maxlength="32" placeholder="这里输入采购数量" title="采购数量" v-model="MATERIAL_NUM" :disabled="type != 'view'"/>--%>
                                                        </td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">已采购数量：</td>
														<td>
                                                            <input class="form-control" placeholder="这里输入已采购数量" type="text" v-model="item.BUY_NUM" :disabled="type == 'view'"/>
                                                        </td>
														<td style="width:100px;text-align: right;padding-top: 13px;">库备数量：</td>
														<td>
															<input class="form-control" placeholder="这里输入库备数量" type="text" v-model="item.STORE_NUM" :disabled="type == 'view'"/>
														</td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">采购单价：</td>
														<td>
															<input class="form-control" placeholder="这里输入采购单价" type="text" v-model="item.UNIT_PRICE" :disabled="type == 'view'"/>
														</td>
														<td style="width:100px;text-align: right;padding-top: 13px;">采购金额：</td>
														<td>
															<input class="form-control" placeholder="这里输入采购金额" type="text" v-model="item.TOTAL_PRICE" :disabled="type == 'view'"/>
														</td>
													</tr>
													<tr>
														<td style="width:100px;text-align: right;padding-top: 13px;">备注：</td>
														<td colspan="3">
															<input class="form-control" placeholder="这里输入备注" type="text" v-model="item.MEMO" :disabled="type == 'view'"/>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</div>
								<!-- 新增按钮 -->
								<div  v-if="type != 'view'">
									<a href="javascript:void(0);" class="btn btn-raised btn-primary m-t-15 waves-effect" @click="addOne">新增</a>
								</div>
								<!-- 新增按钮 -->
							</div>
						</div>
					</div>
				</div>
				
				<div class="row clearfix">
					<div class="col-sm-12">
						<div class="card">
							<div class="body">
								<div class="col-sm-12">
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" @click="save"  v-if="type != 'view'">保存</button>
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
        <script type="text/javascript" src="static/js/modules/project/buy/material_buy_entry.js"></script>
	</body>

</html>