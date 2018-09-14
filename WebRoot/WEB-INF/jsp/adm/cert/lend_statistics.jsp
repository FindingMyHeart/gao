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
    <title>资质借用统计</title>
    <jsp:include page="../../include/top.jsp"></jsp:include>
    <!-- vue -->
    <script type="text/javascript" src="static/js/vue.js"></script>
    <!-- layUI -->
    <link rel="stylesheet" href="static/plugins/layui/css/layui.css" media="all">
    <script src="static/plugins/layui/layui.js" charset="utf-8"></script>
    <!-- bootstrap-dialog -->
    <script type="text/javascript" src="static/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>
    <!-- sweetAlert -->
    <link rel="stylesheet" href="static/plugins/sweetalert/sweetalert.css">
    <script type="text/javascript" src="static/plugins/sweetalert/sweetalert.min.js"></script>
    <!-- 公共的样式 -->
    <link rel="stylesheet" href="static/css/common.css">
</head>

<body class="theme-blue">
<!-- main content -->
<section class="content-all">
    <div class="container-fluid">
        <div class="block-header">
            <h2>资质借用统计</h2>
            <ul class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="index.html">首页</a>
                </li>
                <li class="breadcrumb-item">行政管理</li>
                <li class="breadcrumb-item active">资质管理</li>
            </ul>
        </div>
        <!-- Input -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="header">
                        <h2> 资质借用统计 <small>请填写相关内容</small> </h2>
                        <ul class="header-dropdown m-r--5">
                            <li class="dropdown">
                                <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more-vert"></i> </a>
                            </li>
                        </ul>
                    </div>
                    <div class="body">
                        <h2 class="card-inside-title">条件查询</h2>
                        <div class="row clearfix">
                            <div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" class="form-control"/>
                                        <label class="form-label">资质编号</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" class="form-control"/>
                                        <label class="form-label">资质名称</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-2 col-xs-6 col-gl-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <select class="form-control show-tick">
                                            <option value="" >-- 使用情况 --</option>
                                            <option value="" >在库</option>
                                            <option value="" >借出</option>
                                            <option value="" >催还</option>
                                            <option value="" >逾期</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body">
                        <div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-4 col-xs-offset-5" style="margin-left: 0px;">
                            <button type="button" class="btn btn-raised btn-primary m-t-15 waves-effect">查询</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="body table-responsive">
                        <h2 class="card-inside-title">查询结果</h2>
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>资质编号</th>
                                <th>资质名称</th>
                                <th>有效期</th>
                                <th>使用情况</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input class="form-control" type="text" name="id" value="${vs.index + 1 }" readonly/>
                                </td>
                                <td>
                                    <input class="form-control" type="text" value="" readonly/>
                                </td>
                                <td>
                                    <input class="form-control" type="text" value="" readonly/>
                                </td>
                                <td>
                                    <input class="form-control" type="text" value="" readonly/>
                                </td>
                                <td>
                                    <input class="form-control" type="text" value="" readonly/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="body">
                        <div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-4 col-xs-offset-5" style="margin-left: 0px;">
                            <button type="button" class="btn btn-raised btn-info m-t-15 waves-effect">预览</button>
                            <button type="button" class="btn btn-raised btn-primary m-t-15 waves-effect">打印</button>
                            <button type="button" class="btn btn-raised btn-default m-t-15 waves-effect">下载</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script type="text/javascript" src="static/js/modules/adm/cert/lend_statistics.js"></script>
<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
</body>

</html>