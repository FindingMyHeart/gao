<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html class="no-js" lang="utf-8">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<title>Admin X管理系统</title>
		<base href="<%=basePath%>">
		<link rel="icon" href="favicon.ico" type="image/x-icon">
		<!-- Favicon-->
		<link rel="stylesheet" href="static/plugins/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="static/plugins/morrisjs/morris.css" />
		<!-- Custom Css -->
		<link rel="stylesheet" href="static/css/main.css">
		<link rel="stylesheet" href="static/css/color_skins.css">
		<!-- 公共的样式 -->
		<link rel="stylesheet" href="static/css/common.css">
		<!-- layUI -->
		<link rel="stylesheet" href="static/plugins/layui/css/layui.css">
		<!-- 通用的js组件 myjstools -->
		<script type="text/javascript" src="static/js/modules/common/myjstools.js"></script>
	</head>

	<body class="theme-black">

		<jsp:include page="include/menu.jsp"></jsp:include>
		<section class="content">
			<iframe src="main/main.do" frameborder="0" scrolling="no" id="mainFrame" onload="this.height=100" width="100%"></iframe>
		</section>

		<!-- Jquery Core Js -->
		<script src="static/bundles/libscripts.bundle.js"></script>
		<!-- Lib Scripts Plugin Js ( jquery.v3.2.1, Bootstrap4 js) -->
		<script src="static/bundles/vendorscripts.bundle.js"></script>
		<!-- slimscroll, waves Scripts Plugin Js -->

		<script src="static/bundles/knob.bundle.js"></script>
		<!-- Jquery Knob-->
		<script src="static/bundles/jvectormap.bundle.js"></script>
		<!-- JVectorMap Plugin Js -->
		<script src="static/bundles/morrisscripts.bundle.js"></script>
		<!-- Morris Plugin Js -->
		<script src="static/bundles/sparkline.bundle.js"></script>
		<!-- sparkline Plugin Js -->
		<script src="static/bundles/doughnut.bundle.js"></script>

		<script src="static/bundles/mainscripts.bundle.js"></script>
		<script src="static/js/pages/index.js"></script>
		<!-- layUI -->
		<script src="static/plugins/layui/layui.js"></script>
		<script type="text/javascript">
			function reinitIframe() {
				var iframe = document.getElementById("mainFrame");
				try {
					var bHeight = iframe.contentWindow.document.body.scrollHeight;
					var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
					var height = Math.max(bHeight, dHeight);
					iframe.height = height;
					//console.log(height);
				} catch(ex) {}
			}
			window.setInterval("reinitIframe()", 200);


			function openLayPage(title,url,w,h){
                layui.use(['layer'], function() {
                    var layer = layui.layer;
                    layer.open({
                        type: 2,
                        area: [w+'px', h +'px'],
                        fix: false, //不固定
                        shadeClose: true,
                        shade:0.4,
                        title: title,
                        content: url
                    });
                });
			}
		</script>
	</body>

</html>