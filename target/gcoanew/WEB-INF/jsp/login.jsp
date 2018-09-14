<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
		<title>Admin X管理系统</title>
		<!-- Favicon-->
		<link rel="icon" href="favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="static/plugins/bootstrap/css/bootstrap.min.css">

		<!-- Custom Css -->
		<link rel="stylesheet" href="static/css/main.css">
		<link rel="stylesheet" href="static/css/color_skins.css">
		<!-- 通用的js组件 myjstools -->
		<script type="text/javascript" src="static/js/modules/common/myjstools.js"></script>
	</head>

	<body class="theme-black" id="authentication">
		<div class="authentication">
			<div class="container">
				<div class="col-md-12 content-center">
					<div class="row">
						<div class="col-lg-6 col-md-12">
							<div class="company_detail">
								<h4 class="logo"><img src="static/images/logo.svg" alt=""> Admin X</h4>
								<h3>企业内部管理系统</h3>
								<p>Admin X 管理系统后台</p>
								<div class="footer">
									<hr>
									<ul>
										<li>
											<a href="">联系我们</a>
										</li>
										<li>
											<a href="">关于我们</a>
										</li>
										<li>
											<a href="">技术支持</a>
										</li>
										<li>
											<a href="">FAQ</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="col-lg-5 col-md-12 offset-lg-1">
							<div class="card-plain">
								<div class="header">
									<h5>登录信息</h5>
								</div>
								<form class="form">
									<div class="input-group">
										<input type="text" class="form-control" id="name" placeholder="账户" value="admin">
										<span class="input-group-addon"><i class="zmdi zmdi-account-circle"></i></span>
									</div>
									<div class="input-group">
										<input type="password" class="form-control" id="password" placeholder="密码"  value="123456">
										<span class="input-group-addon"><i class="zmdi zmdi-lock"></i></span>
									</div>
								</form>
								<div class="footer">
									<input type="submit" class="btn btn-primary btn-round btn-block" value="登录" onclick="login.login()">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Jquery Core Js -->
		<script src="static/bundles/libscripts.bundle.js"></script>
		<script src="static/bundles/vendorscripts.bundle.js"></script>
		<!-- Lib Scripts Plugin Js -->
		
		<!-- js -->
		<script type="text/javascript" src="static/js/modules/login.js"></script>
	</body>

</html>