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
		<title>项目登记</title>
		<base href="<%=basePath%>">
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
								<div class="row clearfix">
									<!-- 客户表的主键ID -->
									<input type="hidden" id="PROJECT_ID" value="${pd.PROJECT_ID}" v-model="PROJECT_ID">
									<!-- 类型 -->
									<input type="hidden" id="type" value="${pd.type}" v-model="type">
									<!-- 进入类型 -->
									<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="甲方" type="text" v-model="PART_A" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="乙方" type="text" v-model="PART_B" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同名称" type="text" v-model="CONTRACT_NAME" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目名称*" type="text" v-model="PROJECT_NAME" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<c:if test="${pd.type == 'save'}">
												<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
												<input type="text" class="form-control datetimepicker" disabled="disabled" value="<%=now_date%>" placeholder="建档日期" v-model="PROJECT_DATE">
											</c:if>
											<c:if test="${pd.type != 'save'}">
												<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
												<input type="text" class="form-control datetimepicker" disabled="disabled" placeholder="建档日期" v-model="PROJECT_DATE">
											</c:if>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="开工日期" id="START_DATE" v-model="START_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="竣工日期" id="END_DATE" v-model="END_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="维保日期" id="MAINTENANCE_DATE" v-model="MAINTENANCE_DATE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目地点" type="text" v-model="PROJECT_ADDRESS" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="PAYMENT_MODE" :disabled="type == 'view'">
											<option value="">-- 付款方式 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('xmfkfs')}">
												<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="合同金额" type="text" v-model="CONTRACT_PRICE" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group" v-bind:class="{focused:!!TOTAL_PRICE}">
											<input class="form-control" placeholder="施工总价" type="text" v-model="TOTAL_PRICE"  :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="PROJECT_STATUS" :disabled="type == 'view'">
											<option value="">-- 项目状态 --</option>
											<option value="1">进行中</option>
											<option value="2">已完成</option>
											<option value="3">已挂起</option>
											<option value="4">转售后</option>
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
												<textarea rows="4" class="form-control no-resize" placeholder="填写内容..." v-model="PROJECT_CASE" :disabled="type == 'view'"></textarea>
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
											<tr v-for="(index,contact) in contactList">
												<th>#</th>
												<th>类型</th>
												<th>姓名</th>
												<th>电话</th>
												<th>备注</th>
												<th v-show="type != 'view'">操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>类型</th>
												<th>姓名</th>
												<th>电话</th>
												<th>备注</th>
												<th v-show="type != 'view'">操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,contact) in contactList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="contact.ORDER_NO" disabled>
													</div>
												</td>
												<td>
													<select class="form-control show-tick" v-model="contact.CONTACT_TYPE" :disabled="type == 'view'">
														<option value="">-- 类型 --</option>
														<c:forEach var="p" items="${fns:getDicListByType('lxrlx')}">
															<option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
														</c:forEach>
													</select>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" v-model="contact.CONTACT_NAME" placeholder="姓名"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input type="text" class="form-control" v-model="contact.CONTACT_TEL" placeholder="电话"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" v-model="contact.MEMO" placeholder="备注"  :disabled="type == 'view'"/>
													</div>
												</td>
												<td v-show="type != 'view'">
													<button class="btn btn-danger btn-raised btn-round" @click="deleteThis(index)">删除</button>
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td v-show="type != 'view'">
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
							<div class="header">
								<h2><strong>施工人员信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="MANAGER_USERID" :disabled="type == 'view'">
											<option>-- 项目经理 --</option>
											<c:forEach var="p" items="${fns:getAllStaffList()}">
												<option value="${p.staff_id }">${p.staff_name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="项目副经理" type="text" v-model="PROJECT_DEPUTY_MANAGER" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="TECHNOLOGY_USERID" :disabled="type == 'view'">
											<option value="">-- 技术负责人 --</option>
											<c:forEach var="p" items="${fns:getAllStaffList()}">
												<option value="${p.staff_id }">${p.staff_name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="安全负责人" type="text" v-model="SECURITY_MANAGER" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="施工人员" type="text" v-model="CONSTRUCTION_CLERK" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="安全员" type="text" v-model="SECURITY_CLERK" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="材料员" type="text" v-model="MATERIAL_CLERK" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="资料员" type="text" v-model="DOCUMENT_CLERK" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="预算员" type="text" v-model="BUDGET_CLERK" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="民管员" type="text" v-model="PEOPLE_MANAGER_CLERK" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="其他人员" type="text" v-model="OTHER_PEOPLE" :disabled="type == 'view'">
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
								<h2><strong>深化清单</strong></h2>
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
												<th>操作</th>
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
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
										<tr v-for="(index,item) in shenHuaList">
											<td>
												<div class="form-group">
													<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.SUB_NO">
												</div>
											</td>
											<td>
												<select class="form-control show-tick" v-model="item.SYSTEM_NAME">
													<option value="">-- 系统名称 --</option>
													<c:forEach var="p" items="${fns:getDicListByType('xtmc')}">
														<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
													</c:forEach>
												</select>
											</td>
											<td>
												<select class="form-control show-tick z-index" data-live-search="true" onchange="changeMc('{{index}}',this)" v-model="item.MATERIAL_ID">
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
													<input class="form-control" type="text" v-model="item.MATERIAL_NUM" placeholder="数量">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text" v-model="item.MEMO" placeholder="备注" />
												</div>
											</td>
											<td v-if="type != 'view'">
												<button class="btn btn-danger btn-raised btn-round" @click="deleteShenHua(index)">删除</button>
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
												<button class="btn btn-warning btn-raised btn-round" @click="addShenHua">增加</button>
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
					<div class="col-lg-12">
						<div class="card">
							<div class="header">
								<h2><strong>累计回款金额明细</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
										<tr>
											<th>#</th>
											<th>日期</th>
											<th>回款金额</th>
											<th>备注</th>
											<th>操作</th>
										</tr>
										</thead>
										<tfoot>
										<tr>
											<th>#</th>
											<th>日期</th>
											<th>回款金额</th>
											<th>备注</th>
											<th>操作</th>
										</tr>
										</tfoot>
										<tbody>
										<tr v-for="(index,item) in backMoneyList">
											<td>
												<div class="form-group">
													<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.SUB_NO">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text" v-model="item.MONEY_DATE" placeholder="日期">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text" v-model="item.FEE_AMOUNT" placeholder="回款金额">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text" v-model="item.MEMO" placeholder="备注" />
												</div>
											</td>
											<td v-if="type != 'view'">
												<button class="btn btn-danger btn-raised btn-round" @click="deleteBackMoney(index)">删除</button>
											</td>
										</tr>
										<tr v-if="type!='view'">
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<button class="btn btn-warning btn-raised btn-round" @click="addBackMoney">增加</button>
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
					<div class="col-lg-12">
						<div class="card">
							<div class="header">
								<h2><strong>累计开票金额明细</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
										<tr>
											<th>#</th>
											<th>日期</th>
											<th>开票金额</th>
											<th>备注</th>
											<th>操作</th>
										</tr>
										</thead>
										<tfoot>
										<tr>
											<th>#</th>
											<th>日期</th>
											<th>开票金额</th>
											<th>备注</th>
											<th>操作</th>
										</tr>
										</tfoot>
										<tbody>
										<tr v-for="(index,item) in invoiceMoneyList">
											<td>
												<div class="form-group">
													<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.SUB_NO">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text"  v-model="item.MONEY_DATE" placeholder="日期">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text" v-model="item.FEE_AMOUNT" placeholder="开票金额">
												</div>
											</td>
											<td>
												<div class="form-group">
													<input class="form-control" type="text" v-model="item.MEMO" placeholder="备注" />
												</div>
											</td>
											<td v-if="type != 'view'">
												<button class="btn btn-danger btn-raised btn-round" @click="deleteInvoiceMoney(index)">删除</button>
											</td>
										</tr>
										<tr v-if="type!='view'">
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<button class="btn btn-warning btn-raised btn-round" @click="addInvoiceMoney">增加</button>
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
		<script type="text/javascript" src="static/js/modules/project/base/entry.js"></script>
	</body>

</html>