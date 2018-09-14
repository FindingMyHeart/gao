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
		<title>账户登记</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
		<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript">
			var id = "${id}";

			function initit() {
				//alert(id);
				if(id != "") {
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccount_list", {
						ACCOUNT_ID: id
					}, getinfo_res);
				}

			}

			function getinfo_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}
					var info = data.rows[0];
					myjstools.setallinput(info);
					$("#ACCOUNT_PROPERTY").val(info.ACCOUNT_PROPERTY);
					$("#ACCOUNT_TYPE").val(info.ACCOUNT_TYPE);

				} catch(e) {
					alert("getinfo_res.error:出错了！" + e.message);
				}
			}
			$(function() {
				initit();
			});

			function saveit() {
				//alert($("#KAIHU_BANK").val());
				if($("#KAIHU_BANK").val() == "") {
					alert('请输入开户行名称');
					return;
				}
				if($("#BANK_ACCOUNT").val() == "") {
					alert('请输入账号');
					return;
				}

				var objt = myjstools.getallinput();
				objt.ACCOUNT_PROPERTY = $("#ACCOUNT_PROPERTY option:selected").text();
				objt.ACCOUNT_TYPE = $("#ACCOUNT_TYPE option:selected").text();
				if(id != "") {
					objt.ACCOUNT_ID = id;
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccount_edit", objt, saveit_res);
				} else {
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccount_add", objt, saveit_res);
				}
			}

			function saveit_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}

                    swal({
                        title:'',
                        text: '操作成功！',
                        type: 'success'
                    },function () {
                        $("#entry_qx").click();
                    });

				} catch(e) {
					alert("saveit_res.error:出错了！" + e.message);
				}
			}
		</script>
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
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="ACCOUNT_PROPERTY">
											<option value="">-- 账号性质 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('cwzhxz')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="开户行" type="text" id="KAIHU_BANK" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="账号" type="text" id="BANK_ACCOUNT" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="开户行地址" type="text" id="BANK_ADDRESS" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="ACCOUNT_TYPE">
											<option value="">-- 账户类型 --</option>
											<c:forEach var="p" items="${fns:getDicListByType('cwzhlx')}">
												<option value="${p.DIC_VALUE }">${p.DIC_LABEL }</option>
											</c:forEach>
										</select>
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
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" onclick="saveit()">保存</button>
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button" data-widget="remove" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_new_entry.jsp"></jsp:include>
		
        <!-- Js -->
        <script type="text/javascript" src="static/js/modules/account/entry.js"></script>
        <!--entry.js为空，请把本页中的js移植到该文件中-->
	</body>

</html>