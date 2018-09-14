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
		<title>项目录入</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
	</head>
<body class="theme-black">

		<section class="content-modals" id="entry_body">
			<div class="container-fluid">
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>项目信息</strong></h2>
							</div>
							<div class="body">
								<!-- 客户表的主键ID -->
								<input type="hidden" id="PROJECT_ID" value="${pd.PROJECT_ID}" v-model="PROJECT_ID">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目名称*" type="text" v-model="PROJECT_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<c:if test="${pd.type == 'save'}">
												<input type="text" class="datepicker form-control" disabled="disabled" value="<%=now_date%>" placeholder="建档日期" v-model="PROJECT_DATE">
											</c:if>
											<c:if test="${pd.type == 'edit'}">
												<input type="text" class="datepicker form-control" disabled="disabled" placeholder="建档日期" v-model="PROJECT_DATE">
											</c:if>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="开工日期" id="START_DATE" v-model="START_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="竣工日期" id="END_DATE" v-model="END_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="维保日期" id="MAINTENANCE_DATE" v-model="MAINTENANCE_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目地点" type="text" v-model="PROJECT_ADDRESS">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="PAYMENT_MODE">
											<option value="">-- 付款方式 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('xmfkfs')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同金额" type="text" v-model="CONTRACT_PRICE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="施工总价" type="text" disabled v-model="TOTAL_PRICE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="STATUS">
											<option value="">-- 项目状态 --</option>
											<option value="jxz">进行中</option>
											<option value="ywc">已完成</option>
											<option value="ygq">已挂起</option>
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
								<h2><strong>工程概况</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-sm-12">
										<div class="form-group">
											<div class="form-line">
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="PROJECT_CASE"></textarea>
											</div>
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
								<h2><strong>甲方联系人</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>类型</th>
												<th>姓名</th>
												<th>电话</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>类型</th>
												<th>姓名</th>
												<th>电话</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,contact) in contactList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="contact.ORDER_NO" />
													</div>
												</td>
												<td>
													<select class="form-control show-tick" v-model="contact.CONTACT_TYPE">
														<option value="">-- 类型 --</option>
														<c:forEach var="p" items="${fns:getDicListByType('lxrlx')}">
															<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" v-model="contact.CONTACT_NAME" />
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" v-model="contact.CONTACT_TEL" />
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="contact.MEMO" />
													</div>
												</td>
												<td>
													<button type="button" class="btn btn-danger btn-raised btn-round" @click="deleteThis(index)">删除</button>
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td><button type="button" class="btn btn-warning btn-raised btn-round" @click="addContact">增加</button></td>
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
							<div class="header">
								<h2><strong>施工人员信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="MANAGER_USERID">
											<option>-- 项目经理 --</option>
											<c:forEach var="p" items="${fns:getAllStaffList()}">
												<option value="${p.staff_id }">${p.staff_name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目副经理" type="text" v-model="PROJECT_DEPUTY_MANAGER">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="TECHNOLOGY_USERID">
											<option>-- 技术负责人 --</option>
											<c:forEach var="p" items="${fns:getAllStaffList()}">
												<option value="${p.staff_id }">${p.staff_name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="安全负责人" type="text" v-model="SECURITY_MANAGER">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="施工人员" type="text" v-model="CONSTRUCTION_CLERK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="安全员" type="text" v-model="SECURITY_CLERK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="材料员" type="text" v-model="MATERIAL_CLERK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="资料员" type="text" v-model="DOCUMENT_CLERK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="预算员" type="text" v-model="BUDGET_CLERK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="民管员" type="text" v-model="PEOPLE_MANAGER_CLERK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="其他人员" type="text" v-model="OTHER_PEOPLE">
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
										<em>(Drop <strong>files</strong> here or click to upload.)</em> </div>
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
		<script type="text/javascript" src="static/js/modules/afterSale/xmgl/entry.js"></script>
	</body>

	
</html>