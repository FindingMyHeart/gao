<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Page Loader -->
		<div class="page-loader-wrapper">
			<div class="loader">
				<div class="m-t-30"><img src="static/images/logo.svg" width="48" height="48" alt="AdminX"></div>
				<p>加载中...</p>
			</div>
		</div>

		<div class="overlay"></div>
		<!-- Overlay For Sidebars -->

		<!-- Left Sidebar -->
		<aside id="minileftbar" class="minileftbar">
			<ul class="menu_list">
				<li>
					<a href="javascript:void(0);" class="bars"></a>
					<a href="javascript:void(0);" class="navbar-brand" onclick="toUrl('main/main.do')"><img src="static/images/logo.svg" alt="AdminX"></a>
				</li>
				<li class="power">
					<a href="javascript:void(0);" class="fullscreen" data-provide="fullscreen" title="全屏"><i class="zmdi zmdi-fullscreen"></i></a>
					<a href="javascript:void(0);" class="js-right-sidebar" title="设置"><i class="zmdi zmdi-settings zmdi-hc-spin"></i></a>
					<a href="" class="mega-menu"><i class="zmdi zmdi-power" title="退出"></i></a>
				</li>
			</ul>
		</aside>

		<aside class="right_menu">
			<div id="rightsidebar" class="right-sidebar">
				<ul class="nav nav-tabs">
					<li class="nav-item">
						<a class="nav-link active" data-toggle="tab" href="#setting">设置</a>
					</li>
				</ul>
				<div class="tab-content slim_scroll">
					<div class="tab-pane slideRight active" id="setting">
						<div class="card">
							<div class="header">
								<h2><strong>主题</strong> 颜色 </h2>
							</div>
							<div class="body">
								<ul class="choose-skin list-unstyled m-b-0">
									<li data-theme="black" class="active">
										<div class="black"></div>
									</li>
									<li data-theme="purple">
										<div class="purple"></div>
									</li>
									<li data-theme="blue">
										<div class="blue"></div>
									</li>
									<li data-theme="cyan">
										<div class="cyan"></div>
									</li>
									<li data-theme="green">
										<div class="green"></div>
									</li>
									<li data-theme="orange">
										<div class="orange"></div>
									</li>
									<li data-theme="blush">
										<div class="blush"></div>
									</li>
								</ul>
							</div>
						</div>
						<div class="card">
							<div class="header">
								<h2><strong>面板</strong> 颜色</h2>
							</div>
							<div class="body theme-light-dark">
								<button class="t-dark btn btn-primary btn-round btn-block">切换</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="leftsidebar" class="sidebar">
				<div class="menu">
					<ul class="list">
						<li>
							<div class="user-info m-b-20">
								<div class="image">
									<a href="profile.html"><img src="static/images/user.svg" alt="User"></a>
								</div>
								<div class="detail">
									<h6>${sessionScope.sessionUser.STAFF_NAME}(${sessionScope.sessionUser.STAFF_CODE})</h6>
									<p class="m-b-0">${sessionScope.sessionUser.DEPT_NAME}：${sessionScope.sessionUser.POST_NAME}</p>
									<a href="javascript:void(0);" title="" class=" waves-effect waves-block"><i class="zmdi zmdi-settings"></i></a>
									<a href="javascript:void(0);" title="" class=" waves-effect waves-block"><i class="zmdi zmdi-notifications"></i></a>
									<a href="javascript:void(0);" title="" class=" waves-effect waves-block"><i class="zmdi zmdi-email"></i></a>
									<a href="javascript:void(0);" title="" class=" waves-effect waves-block"><i class="zmdi zmdi-power"></i></a>
								</div>
							</div>
						</li>
						<li>
							<a href="javascript:void(0);" onclick="toUrl('main/main.do')"><i class="zmdi zmdi-home"></i><span>指示板</span></a>
						</li>
						${menuHtml}
					</ul>
				</div>
			</div>
		</aside>

		<!-- main content -->
		<script type="text/javascript" src="static/js/modules/include/menu.js"></script>