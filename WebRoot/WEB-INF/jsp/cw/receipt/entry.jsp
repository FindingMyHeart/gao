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
		<title>收据申请</title>
		<jsp:include page="../../include/header_entry.jsp"></jsp:include>
		<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>
		
		<script type="text/javascript">
			var id = "${id}";

			function initit1() {
				//alert(id);
				if(id != "") {
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwreceipt_list", {
						RECEIPT_ID: id
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
					$("#PROJECT_ID").val(info.PROJECT_ID);
				} catch(e) {
					alert("getinfo_res.error:出错了！" + e.message);
				}
			}
			$(function() {
				initit1();
			});

			function saveit() {
				//alert($("#KAIHU_BANK").val());
				if($("#AMOUNT_MONEY").val() == "") {
					alert('请输入金额');
					return;
				}

				var objt = myjstools.getallinput();
				objt.PROJECT_ID = $("#PROJECT_ID option:selected").val();
				if(id != "") {
					objt.RECEIPT_ID = id;
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwreceipt_edit", objt, saveit_res);
				} else {
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwreceipt_add", objt, saveit_res);
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
					initit();
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
										<div class="form-group">
											<input class="form-control" placeholder="项目编号!" type="text">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" id="PROJECT_ID">
                                            <option value="" >-- 项目名称 --</option>
                                            <c:forEach var="p" items="${fns:getAllProjectList()}">
                                                <option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
                                            </c:forEach>
                                        </select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="部门" type="text" value="${sessionScope.sessionUser.DEPT_NAME}" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请人" type="text" value="${sessionScope.sessionUser.STAFF_NAME}" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="申请日期" type="text" value="<%= now_date%>" disabled>
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="金额" type="text" id="AMOUNT_MONEY" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="付款单位" type="text" id="PAYMENT_COMPANY" up="up">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="款项内容" type="text" id="PAYMENT_CONTENT" up="up">
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
									<button class="btn btn-raised btn-primary btn-round waves-effect" type="button" onclick="saveit()">保存</button>
									<button class="btn btn-raised btn-default btn-round waves-effect" type="button" data-widget="remove" id="entry_qx">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<jsp:include page="../../include/footer_entry.jsp"></jsp:include>
		
		<!-- Js -->
		<script type="text/javascript" src="static/js/modules/receipt/entry.js"></script>
		<!--entry.js为空，请把本页中的js移植到该文件中-->
	</body>

</html>
	