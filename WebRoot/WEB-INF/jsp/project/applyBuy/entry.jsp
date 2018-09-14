<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
    java.text.SimpleDateFormat simpleDateFormat = new java.text.SimpleDateFormat(
            "yyyy-MM-dd");
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
		<title>申购申请</title>
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
								<input type="hidden" id="APPLYBUY_ID" value="${pd.APPLYBUY_ID}" v-model="APPLYBUY_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 进入类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申购单号" type="text" disabled v-model="APPLYBUY_SN">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input type="text" class="form-control" disabled="disabled" v-model="APPLY_NAME" placeholder="申购人" value="${sessionScope.sessionUser.STAFF_NAME}">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input type="text" class="form-control" disabled="disabled" v-model="DEPT_NAME" placeholder="申购部门" value="${sessionScope.sessionUser.DEPT_NAME}">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申购人职位" type="text" disabled  value="${sessionScope.sessionUser.POST_NAME}">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input type="text" class="form-control" disabled="disabled" v-model="APPLY_DATE" placeholder="申购日期" value="<%=now_date%>">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PROJECT_ID" :disabled="type == 'view'">
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
								<h2><strong>申购清单</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>系统名称</th>
												<th>名称</th>
												<th>品牌</th>
												<th>规格型号</th>
												<th>单位</th>
												<th>数量</th>
												<th>备注</th>
												<th v-if="type != 'view'">操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>系统名称</th>
												<th>名称</th>
												<th>品牌</th>
												<th>规格型号</th>
												<th>单位</th>
												<th>数量</th>
												<th>备注</th>
												<th v-if="type != 'view'">操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in itemList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.SUB_NO" disabled>
													</div>
												</td>
												<td>
													<select class="form-control show-tick" v-model="item.SYSTEM_NAME" :disabled="type == 'view'">
														<option value="">-- 系统名称 --</option>
														<c:forEach var="p" items="${fns:getDicListByType('xtmc')}">
															<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<select class="form-control show-tick z-index" data-live-search="true" onchange="changeMc('{{index}}',this)" v-model="item.MATERIAL_ID" :disabled="type == 'view'">
														<option value="">--名称</option>
														<c:forEach var="p" items="${fns:getAllMaterialList()}">
															<option value="${p.MATERIAL_ID }" title="${p.MATERIAL_BRAND}-${p.MATERIAL_SPEC}-${p.MATERIAL_UNIT}">${p.MATERIAL_NAME }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" readonly v-model="item.MATERIAL_BRAND" placeholder="品牌">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" readonly v-model="item.MATERIAL_SPEC" placeholder="规格型号">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" readonly v-model="item.MATERIAL_UNIT" placeholder="单位">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.MATERIAL_NUM" placeholder="数量" :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="item.MEMO" placeholder="备注" :disabled="type == 'view'"/>
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
												<td>
													<button class="btn btn-warning btn-raised btn-round" @click="addContact">增加</button>
													<button class="btn btn-info btn-raised btn-round" style="display: none;">导入</button>
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
		<script type="text/javascript" src="static/js/modules/project/applyBuy/entry.js"></script>
	</body>

</html>