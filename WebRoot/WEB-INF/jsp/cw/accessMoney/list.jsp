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
		<title>银行存取款</title>
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
		<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>

		<script type="text/javascript">
			//单击编辑
			function edit(rowData) {
				if(rowData) {
					openBootStrapDialog("", "cw/accessMoney/entry?id=" + rowData.ACCESS_ID, "1");
				}
			}

			function info(rowData) {
				//var checkStatus = table.checkStatus('mytable');
				//alert(rowData.ACCESS_ID);
				if(rowData) {
					openBootStrapDialog("修改", "cw/accessMoney/entry?id=" + rowData.ACCESS_ID, "1");
				}

			}

			function delit(rowData) {
				myjstools.ajax(true, "POST", "/web/service?METHOD=cwaccessmoney_delete", {
						ACCESS_ID: rowData.ACCESS_ID
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
				openBootStrapDialog("添加", "cw/accessMoney/entry", "1");
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
				param.TIAOCHU_PAYMENT_ACCOUNTID = $("#S_TIAOCHU_PAYMENT_ACCOUNTID option:selected").val();
				param.TIAORU_RECEIPT_ACCOUNTID = $("#S_TIAORU_RECEIPT_ACCOUNTID option:selected").val();
				return param;
			}

			function initit() {
				//top.hangge();
				layui.use('table', function() {
					var table = layui.table;

					table.render({
						elem: '#dg',
						url: myjstools.wwwroot + '/web/service?METHOD=cwaccessmoney_list',
						id: 'mytable',
						where: onBeforeLoad(),
						cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
							,
						cols: [
							[{
								type: 'numbers',
								fixed: 'left'
							}, {
								field: 'ACCESS_SN',
								width: 100,
								title: '订单号'
							}, {
								field: 'CREATE_TIME',
								width: 120,
								title: '登记日期'
							}, {
								field: 'TIAOCHU_PAYMENT_ACCOUNTNAME',
								width: 120,
								title: '付款账户'
							}, {
								field: 'TIAOCHU_BIZHONG',
								width: 120,
								title: '调出币种'
							}, {
								field: 'TIAOCHU_HUILV',
								width: 120,
								title: '调出汇率'
							}, {
								field: 'TIAOCHU_MONEY',
								width: 120,
								title: '调出金额'
							}, {
								field: 'TIAORU_RECEIPT_ACCOUNTNAME',
								width: 120,
								title: '收款账户'
							}, {
								field: 'TIAORU_BIZHONG',
								width: 120,
								title: '调入币种'
							}, {
								field: 'TIAORU_HUILV',
								width: 120,
								title: '调入汇率'
							}, {
								field: 'TIAORU_MONEY',
								width: 120,
								title: '调入金额'
							}, {
								field: 'MEMO',
								width: 120,
								title: '备注'
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
						} else if(layEvent === 'del') { //删除
							layer.confirm('真的删除吗', function(index) {
								//向服务端发送删除指令
								delit(obj.data);
								layer.close(index);
							});
						} else if(layEvent === 'edit') { //编辑
							//do something
							edit(obj.data);

						}
					});
				});
			}

			$(
				function() {
					initit();
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
							<h2>银行存取款</h2>
							<ul class="breadcrumb padding-0">
								<li class="breadcrumb-item">
									<a href="index.html"><i class="zmdi zmdi-home"></i></a>
								</li>
								<li class="breadcrumb-item">
									<a href="javascript:void(0);">财务管理</a>
								</li>
								<li class="breadcrumb-item active">资金管理</li>
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
												<a href="javascript:void(0);" onclick="add();">银行存取款登记</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="row clearfix">
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="S_TIAOCHU_PAYMENT_ACCOUNTID">
											<option value="">-- 付款账户 --</option>
											<c:forEach var="p" items="${fns:getAllAccountList()}">
												<option value="${p.ACCOUNT_ID }">${p.ACCOUNT_NAME }</option>
											</c:forEach>
										</select>
									</div>
									<div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
										<select class="form-control show-tick" id="S_TIAORU_RECEIPT_ACCOUNTID">
											<option value="">-- 收款账户 --</option>
											<c:forEach var="p" items="${fns:getAllAccountList()}">
												<option value="${p.ACCOUNT_ID }">${p.ACCOUNT_NAME }</option>
											</c:forEach>
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
								<ul class="header-dropdown">
									<li class="dropdown">
										<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
										<ul class="dropdown-menu dropdown-menu-right">
											<li>
												<a href="javascript:void(0);" onclick="hzxz();">汇总下载</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="body">
								<div class="table-responsive">
									<table id="dg" class="layui-hide table table-striped" width="100%" lay-filter="mytable"></table>
									<script type="text/html" id="barDemo">
										<button type="button" class="btn btn-info btn-xs" lay-event="detail">预览</button>
										<button type="button" class="btn btn-success btn-xs" lay-event="edit">修改</button>
										<button type="button" class="btn btn-danger btn-xs" lay-event="del">删除</button>
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
		<script type="text/javascript" src="static/js/modules/common/common_list.js"></script><%--
		<script type="text/javascript" src="static/js/modules/accessMoney/list.js"></script>--%>
		<!--list.js为空，请把本页中的js移植到该文件中-->
	</body>

</html>