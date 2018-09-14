<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html class="no-js " lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>入职登记</title>
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
								<input type="hidden" id="staff_id" value="${pd.staff_id}" v-model="staff_id">
								<!-- 类型 -->
								<input type="hidden" id="type" value="${pd.type}" v-model="type">
								<!-- 类型 -->
								<input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="姓名*" type="text" v-model="staff_name">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="staff_sex" id="staff_sex">
											<option value="">-- 性别 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('sex')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="民族" type="text" v-model="staff_nation">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="political_status">
											<option value="">-- 政治面貌 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('zzmm')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="marital">
											<option value="">-- 婚姻状况 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('hyzk')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="出生日期" v-model="birthday" id="birthday">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="education">
											<option value="">-- 学历 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('education')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="毕业院校" type="text" v-model="graduate_school">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="专业" type="text" v-model="major">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="毕业日期" v-model="graduate_date" id="graduate_date">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="学位" type="text" v-model="degree">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="外语水平" type="text" v-model="english_level">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="身份证*" type="text" v-model="id_card">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="户口所在地" type="text" v-model="hukou_location">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="联系方式*" type="text" v-model="contact">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="家庭电话" type="text" v-model="home_tel">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="电子邮箱*" type="text" v-model="email">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="现居住地址" type="text" v-model="address">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="应急联系人*" type="text" v-model="emergency_contact">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="应急联系人电话*" type="text" v-model="emergency_contact_tel">
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
								<h2><strong>就职信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="职员编号" type="text" disabled v-model="staff_code">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="建档日期!" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="staff_status">
											<option value="">-- 职员状态 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('zyzt')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model=dept_id>
											<option value="">-- 部门 --</option>
											<c:forEach var="p" items="${fns:getAllBmList()}">
												<option value="${p.DEPT_ID }">${p.DEPT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="post">
											<option value="">--职位 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('zw')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="职称" type="text" v-model="rank">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="入职日期" v-model="join_date" id="join_date">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="转正日期" v-model="zhuanzheng_date" id="zhuanzheng_date">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="社保日期" v-model="shebao_date" id="shebao_date">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control datetimepicker" placeholder="公积金日期" v-model="gongjijin_date" id="gongjijin_date">
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
								<h2><strong>资质认证</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>获取日期</th>
												<th>证书有效期</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>获取日期</th>
												<th>证书有效期</th>
												<th>备注</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in certList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.num">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="名称" v-model="item.cert_name">
													</div>
												</td>
												<td>
													<div class="input-group">
														<input type="text" class="form-control datetimepicker" placeholder="获取日期" v-model="item.get_date">
													</div>
												</td>
												<td>
													<div class="input-group">
														<input type="text" class="form-control datetimepicker" placeholder="证书有效期" v-model="item.valid_date">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="备注" v-model="item.memo">
													</div>
												</td>
												<td>
													<button class="btn btn-danger btn-raised btn-round" @click="deleteThis1(index)">删除</button>
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<button class="btn btn-warning btn-raised btn-round" @click="addContact1">增加</button>
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
								<h2><strong>工作经历</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>工作单位</th>
												<th>工作职位</th>
												<th>工作时间</th>
												<th>离职原因</th>
												<th>证明人</th>
												<th>证明人电话</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>工作单位</th>
												<th>工作职位</th>
												<th>工作时间</th>
												<th>离职原因</th>
												<th>证明人</th>
												<th>证明人电话</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in experienceList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.num">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="工作单位" v-model="item.work_company">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="工作岗位" v-model="item.work_post">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="获取日期" v-model="item.work_time">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="离职原因" v-model="item.leave_reason">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="证明人" v-model="item.reference">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="证明人电话" v-model="item.reference_tel">
													</div>
												</td>
												<td>
													<button class="btn btn-danger btn-raised btn-round" @click="deleteThis2(index)">删除</button>
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
												<td>
													<button class="btn btn-warning btn-raised btn-round" @click="addContact2">增加</button>
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
								<h2><strong>家庭成员信息</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped table-hover js-basic-example dataTable">
										<thead>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>关系</th>
												<th>现住址</th>
												<th>工作单位</th>
												<th>职务</th>
												<th>电话</th>
												<th>操作</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>#</th>
												<th>名称</th>
												<th>关系</th>
												<th>现住址</th>
												<th>工作单位</th>
												<th>职务</th>
												<th>电话</th>
												<th>操作</th>
											</tr>
										</tfoot>
										<tbody>
											<tr v-for="(index,item) in familyList">
												<td>
													<div class="form-group">
														<input class="form-control" type="text" name="id" value="{{index + 1}}" readonly v-model="item.num">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="名称" v-model="item.name">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="关系" v-model="item.relation">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="现住址" v-model="item.address">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="工作单位" v-model="item.work_company">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="职务" v-model="item.post">
													</div>
												</td>
												<td>
													<div class="form-group">
														<input class="form-control" type="text" placeholder="电话" v-model="item.tel">
													</div>
												</td>
												<td>
													<button class="btn btn-danger btn-raised btn-round" @click="deleteThis3(index)">删除</button>
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
												<td>
													<button class="btn btn-warning btn-raised btn-round" @click="addContact3">增加</button>
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
		<script type="text/javascript" src="static/js/modules/personnel/staff/entry.js"></script>
	</body>

</html>