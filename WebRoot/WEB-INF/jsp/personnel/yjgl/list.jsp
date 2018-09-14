<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fns" uri="http://mytag.sf.net/fns" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<base href="<%=basePath%>">
		<title>邮件管理</title>
		<jsp:include page="../../include/header_list.jsp"></jsp:include>
		<script type="text/html" id="titleTpl">
			{{# if(d.f_sfyd
			<1 ){ }} <b>{{d.f_bt}}</b>
				{{# } else { }} {{d.f_bt}} {{# } }}
		</script>
		<script type="text/javascript">
			var f_lx = "sjx";

			//单击编辑
			function edit(rowData) {
				if(rowData) {
					openBootStrapDialog("", "yjgl/edit?id=" + rowData.pk_id, "1");
				}
			}

			function info(rowData) {
				//var checkStatus = table.checkStatus('mytable');
				if(rowData) {
					openBootStrapDialog("", "yjgl/info?id=" + rowData.pk_id, "1");
				}
			}

			function delit(rowData) {
				myjstools.ajax(true, "POST", "/web/service?METHOD=yjyxsc", {
						pk_id: rowData.pk_id
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
				openBootStrapDialog("添加", "yjgl/add", "1");
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
				param.f_lx = f_lx;
				param.keyword = $("#keyword").val();
				return param;
			}

			function initit() {
				//alert(12);
				//top.hangge();
				//alert(myjstools.wwwroot + '/web/service?METHOD=yjyxlb');
				layui.use('table', function() {
					var table = layui.table;

					table.render({
						elem: '#dg',
						url: myjstools.wwwroot + '/web/service?METHOD=yjyxlb',
						id: 'mytable',
						where: onBeforeLoad(),
						cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
							,
						cols: [
							[{
								field: 'f_bt',
								width: 300,
								title: '标题',
								templet: '#titleTpl'
							}, {
								field: 'f_fsyhmc',
								width: 120,
								title: '发送人'
							}, {
								field: 'f_jsyhmc',
								width: 120,
								title: '接收人'
							}, {
								field: 'f_tjsj',
								width: 120,
								title: '时间'
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

				/*
					$('#dg').datagrid({
						iconCls: 'icon-edit',
						singleSelect: true,
						onDblClickRow: onDblClickRow,
						onBeforeLoad: onBeforeLoad,
						pagination: true,
						url: myjstools.wwwroot + '/app/web?method=yjyxlb',
						rownumbers: true,
						loadMsg: '正在加载数据...',
						onLoadError: function() {
							alert('数据加载出错了');
						},
						method: 'post',
						pageNumber: 1,
						pageSize: 10,
						pageList: [10, 20, 50, 100],
						columns: [
							[{
								field: 'f_tjsj'.toLowerCase(),
								title: '时间',
								formatter: function(value, row, index) {
									if(row.f_sfyd == 0) {
										return '<b>' + value + '</b>';
									} else {
										return value;
									}

								}
							}, {
								field: 'f_fsyhmc'.toLowerCase(),
								title: '发送用户',
								formatter: function(value, row, index) {
									if(row.f_sfyd == 0) {
										return '<b>' + value + '</b>';
									} else {
										return value;
									}

								}
							}, {
								field: 'f_jsyhmc'.toLowerCase(),
								title: '接收用户',
								formatter: function(value, row, index) {
									if(row.f_sfyd == 0) {
										return '<b>' + value + '</b>';
									} else {
										return value;
									}

								}
							}, {
								field: 'f_bt'.toLowerCase(),
								title: '标题',
								formatter: function(value, row, index) {
									if(row.f_sfyd == 0) {
										return '<b>' + value + '</b>';
									} else {
										return value;
									}

								}
							}]
						]
					});

					//设置分页
					var p = $('#dg').datagrid('getPager');
					p.pagination('refresh', {
						displayMsg: "显示 {from} 到 {to} 共 {total} 条"
					});
					*/
			}

			$(
				function() {
					initit();
				}
			);
		</script>
		<script type="text/javascript">
			function gotosjx() {
				f_lx = "sjx";

				$('#myTitle').text("收件箱");
				submitForm();
			}

			function gotofjx() {
				f_lx = "fjx";

				$('#myTitle').text("发件箱");
				submitForm();
			}

			function gotocgx() {
				f_lx = "cgx";

				$('#myTitle').text("草稿箱");
				submitForm();
			}

			function gotosc() {

				$('#myTitle').text("垃圾箱");
				submitForm();
			}
		</script>
	</head>

	<body class="theme-black">

			<section class="content-modals">
				<div class="container-fluid">
					<div class="block-header">
						<div class="row">
							<div class="col-lg-5 col-md-5 col-sm-12">
								<h2>邮件管理</h2>
								<ul class="breadcrumb padding-0">
									<li class="breadcrumb-item">
										<a href=""><i class="zmdi zmdi-home"></i></a>
									</li>
									<li class="breadcrumb-item active">基础管理</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="row clearfix">
						<div class="col-lg-2 col-md-2 col-sm-2">
							<div class="card">
								<div class="body">
									<div class="row clearfix">
										<div class="col-lg-12 col-md-12 col-sm-12">
											<button type="button" class="btn btn-raised m-b-10 btn-round bg-blue btn-block waves-effect" onclick="add()"> 写邮件 </button>
										</div>
										<!-- 
										<div class="col-lg-12 col-md-12 col-sm-12">
											<button type="button" class="btn btn-raised m-b-10 btn-round bg-green btn-block waves-effect"> 通讯录 </button>
										</div>
										 -->
									</div>
								</div>
							</div>
							<div class="card">
								<div class="body">
									<div class="row clearfix">
										<div class="col-lg-12 col-md-12 col-sm-12">
											<button type="button" class="btn btn-raised m-b-10 btn-round btn-primary btn-block waves-effect" onclick="gotosjx()"> 收件箱 </button>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<button type="button" class="btn btn-raised m-b-10 btn-round btn-primary btn-block waves-effect" onclick="gotofjx()"> 发件箱 </button>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<button type="button" class="btn btn-raised m-b-10 btn-round btn-primary btn-block waves-effect" onclick="gotocgx()"> 草稿箱 </button>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<button type="button" class="btn btn-raised m-b-10 btn-round btn-danger btn-block waves-effect" onclick="gotosc()"> 已删除 </button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-10 col-md-10 col-sm-10">
							<div class="card">
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
			<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
		</body>

</html>