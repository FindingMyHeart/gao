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
		<title>发票申请</title>
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
                                <input type="hidden" id="APPLY_ID" value="${pd.APPLY_ID}" v-model="APPLY_ID">
                                <!-- 类型 -->
                                <input type="hidden" id="type" value="${pd.type}" v-model="type">
                                <!-- 类型 -->
                                <input type="hidden" id="in_type" value="${pd.in_type}" v-model="in_type">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号！" type="text" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="PROJECT_ID" :disabled="type == 'view'">
                                            <option value="" >-- 项目名称 --</option>
                                            <c:forEach var="p" items="${fns:getAllProjectList()}">
                                            <option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="部门" type="text" disabled value="${sessionScope.sessionUser.DEPT_NAME}" v-model="DEPT_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请人" type="text" disabled value="${sessionScope.sessionUser.STAFF_NAME}" v-model="STAFF_NAME">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请日期" type="text" disabled value="<%=now_date%>" v-model="CREATE_DATE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="INVOICE_CONTENT" :disabled="type == 'view'">
                                            <option value="">-- 发票内容 --</option>
                                            <c:forEach var="p" items="${fns:getDicListByType('kplx')}">
                                            <option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="INVOICE_TYPE" :disabled="type == 'view'">
                                            <option value="">-- 发票类型 --</option>
                                            <c:forEach var="p" items="${fns:getDicListByType('fpzl')}">
                                            <option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" v-model="TAX_RATE" :disabled="type == 'view'">
                                            <option value="">-- 税率 --</option>
                                            <c:forEach var="p" items="${fns:getDicListByType('sl')}">
                                                <option value="${p.DIC_ID }">${p.DIC_LABEL }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="金额" type="text" v-model="AMOUNT_MONEY" :disabled="type == 'view'">
										</div>
									</div>
									<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 m-b-20">
										<div class="form-group">
											<label class="form-label">发票税率说明：3%简易计税，甲供材，轻包工，营改增前老项目；6%服务类；11%建筑安装（工程服务、安装服务、修缮服务、装饰服务）；17%销售类.</label>
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
								<h2><strong>发票信息</strong></h2>
							</div>
							<div class="body">
								<div class="row clearfix">
								    <div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" v-model="INVOICE_INFO_ID" :disabled="type == 'view'">
											<option value="">-- 开票名称 --</option>
                                            <c:forEach var="p" items="${fns:getAllKpxxList()}">
                                            <option value="${p.INVOICE_ID }">${p.INVOICE_NAME }</option>
                                            </c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="社会统一信用代码" type="text" disabled v-model="SOCIAL_CODE">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="开户行" type="text" disabled v-model="OPEN_BANK">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="账号" type="text" disabled v-model="BANK_ACCOUNT">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="地址" type="text" disabled v-model="ADDRESS">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="电话" type="text" disabled v-model="TEL">
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
        <script type="text/javascript" src="static/js/modules/cw/invoiceApply/entry.js"></script>
	</body>

</html>