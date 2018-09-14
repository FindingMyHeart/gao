<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html class="no-js " lang="utf-8">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>收据申请审批</title>
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
		<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>

		<script type="text/javascript">
			//单击编辑
			function check(rowData, STATUS) {
				myjstools.ajax(true, "POST", "/web/service?METHOD=cwreceipt_check", {
						RECEIPT_ID: rowData.RECEIPT_ID,
						STATUS: STATUS
					},
					function(data) {
						try {
							if(data.success != 1) {
								alert("server.error:" + data.msg);
								return;
							}
							//alert("操作成功");
							submitForm();
						} catch(e) {
							alert("saveit_res.error:出错了！" + e.message);
						}
					}
				);
			}
			//单击编辑
			function edit(rowData) {
				if(rowData) {
					openBootStrapDialog("", "cw/receipt/entry?id=" + rowData.RECEIPT_ID, "1");
				}
			}

			function info(rowData) {
				//var checkStatus = table.checkStatus('mytable');
				//alert(rowData.RECEIPT_ID);
				if(rowData) {
					openBootStrapDialog("编辑", "cw/receipt/entry?id=" + rowData.RECEIPT_ID, "1");
				}

			}

			function delit(rowData) {
				myjstools.ajax(true, "POST", "/web/service?METHOD=cwreceipt_delete", {
						RECEIPT_ID: rowData.RECEIPT_ID
					},
					function(data) {
						try {
							if(data.success != 1) {
								alert("server.error:" + data.msg);
								return;
							}
							//alert("操作成功");
							submitForm();
						} catch(e) {
							alert("saveit_res.error:出错了！" + e.message);
						}
					}
				);
			}

			function add() {
				openBootStrapDialog("添加", "cw/receipt/entry", "1");
			}

			//查询
			function submitForm() {
				//$('#dg').datagrid('load');
				var param = onBeforeLoad();
				layui.table.reload('mytable', {
					where: param
				});

			}

			function onBeforeLoad() {
				var param = new Object();
				param.PROJECT_ID = $("#S_PROJECT_ID").val();
				param.CREATE_DEPTID = $("#S_CREATE_DEPTID").val();
				param.CREATE_USERID = $("#S_CREATE_USERID").val();
				param.STATUS = $("#S_STATUS").val();
				param.CREATE_DATE_SEARCH = $("#CREATE_DATE_SEARCH").val();
				return param;
			}

			function initit() {
				//top.hangge();
				layui.use('table', function() {
					var table = layui.table;

					table.render({
						elem: '#dg',
						url: myjstools.wwwroot + '/web/service?METHOD=cwreceipt_list',
						id: 'mytable',
						where: onBeforeLoad(),
						cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
							,
						cols: [
							[{
								type: 'numbers',
								fixed: 'left'
							}, {
								field: 'PROJECT_NAME',
								width: 300,
								title: '项目名称'
							}, {
								field: 'CREATE_DEPTNAME',
								width: 120,
								title: '部门'
							}, {
								field: 'CREATE_USERNAME',
								width: 120,
								title: '申请人'
							}, {
								field: 'CREATE_TIME',
								width: 120,
								title: '申请日期'
							}, {
								field: 'STATUS',
								width: 120,
								title: '状态',
								align: 'center'
							}, {
								fixed: 'right',
								width: 150,
								align: 'center',
								toolbar: '#barDemo'
							}]
						],
						page: true,
						limit: 20,
						height: 'auto',
						request: {
							pageName: 'currentPage' //页码的参数名称，默认：page
								,
							limitName: 'pageSize' //每页数据量的参数名，默认：limit
						},
						response: {
							statusName: 'success' //数据状态的字段名称，默认：code
								,
							statusCode: 1 //成功的状态码，默认：0
								,
							msgName: 'msg' //状态信息的字段名称，默认：msg
								,
							countName: 'total' //数据总数的字段名称，默认：count
								,
							dataName: 'rows' //数据列表的字段名称，默认：data
						}
					});

					//监听工具条
					table.on('tool(mytable)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
						var data = obj.data; //获得当前行数据
						var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
						var tr = obj.tr; //获得当前行 tr 的DOM对象

						if(layEvent === 'detail') { //查看
							info(obj.data);
						} else if(layEvent === 'check') { //编辑
							//do something
							check(obj.data, '开据');

						} else if(layEvent === 'cancel') { //作废
							//do something
							check(obj.data, '作废');

						}
					});
				});
			}

			$(
				function() {
					initit();
					layui.use('laydate', function(){
				        var laydate = layui.laydate;
				        //执行一个laydate实例
				        laydate.render({
				            elem: '#CREATE_DATE_SEARCH' //指定元素
				        });
				    });
				}
			);
		</script>
	</head>

	<body class="theme-black">

		<section class="content-modals">
			<div class="container-fluid">
				<div class="block-header">
					<div class="row">
						<div class="col-lg-5 col-md-5 col-sm-12">
							<h2>收据申请审批</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item">
									<a href="javascript:void(0);">财务管理</a>
								</li>
								<li class="breadcrumb-item active">收据管理</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="card">
							<div class="header">
								<h2><strong>查询条件</strong></h2>
								<ul class="header-dropdown">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);" onclick="add();">收据申请</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="form-group">
											<input class="form-control" placeholder="订单号!" type="text">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control z-index show-tick" data-live-search="true" id="S_PROJECT_ID">
											<option value="">-- 项目名称 --</option>
											<c:forEach var="p" items="${fns:getAllProjectList()}">
												<option value="${p.PROJECT_ID }">${p.PROJECT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="S_CREATE_DEPTID">
											<option value="">-- 部门 --</option>
											<c:forEach var="p" items="${fns:getAllBmList()}">
												<option value="${p.DEPT_ID }">${p.DEPT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="S_CREATE_USERID">
											<option value="">-- 申请人 --</option>
											<c:forEach var="p" items="${fns:getAllStaffList()}">
												<option value="${p.staff_id }">${p.staff_name }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<div class="input-group">
											<span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
											<input type="text" class="form-control" placeholder="申请日期" id="CREATE_DATE_SEARCH">
										</div>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="S_STATUS">
											<option value="">-- 收据状态 --</option>
											<option value="新建">新建</option>
											<option value="开据">通过</option>
											<option value="作废">驳回</option>
										</select>
									</div>

									<div class="col-sm-12">
										<div class="form-group form-float">
											<button type="button" class="btn btn-raised btn-primary btn-round waves-effect" onclick="submitForm();">查询</button>
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
								<h2><strong>查询结果</strong></h2>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table id="dg" class="layui-hide table table-striped" width="100%" lay-filter="mytable"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-info btn-xs" lay-event="detail">预览</button> {{# if(d.STATUS == "新建"){ }}
										<button type="button" class="btn bg-orange btn-xs" lay-event="check">通过</button>
										<button type="button" class="btn bg-red btn-xs" lay-event="cancel">驳回</button> {{# } }}
									</script>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>
		<jsp:include page="../../include/footer_list.jsp"></jsp:include>

		<!-- Js -->
		<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
		<script type="text/javascript" src="static/js/modules/receipt/examine.js"></script>
		<!--examine.js为空，请把本页中的js移植到该文件中-->
	</body>

</html>