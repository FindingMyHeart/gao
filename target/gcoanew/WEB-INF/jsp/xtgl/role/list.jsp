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
    <title>权限管理</title>
    <jsp:include page="../../include/header_new_list.jsp"></jsp:include>
</head>

<body class="theme-black">

<section class="content-modals">
    <div class="container-fluid">
        <div class="block-header">
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-12">
                    <h2>权限管理</h2>
                    <ul class="breadcrumb padding-0">
                        <li class="breadcrumb-item">
                            <a href="index.html"><i class="zmdi zmdi-home"></i></a>
                        </li>
                        <li class="breadcrumb-item active">权限查询</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card layListTable">
                    <div class="header">
                        <h2><strong>查询条件</strong></h2>
                        <ul class="header-dropdown">
                            <li class="dropdown">
                                <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a href="javascript:void(0);" @click="save">新增权限</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="body">
                        <div class="row clearfix">

                            <div class="col-md-4 col-lg-2 col-sm-4 col-xs-12 m-b-20">
                                <div class="form-group">
                                    <input class="form-control" placeholder="权限名称" type="text" id="role_name_search">
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group form-float">
                                    <button type="button" class="btn btn-raised btn-primary btn-round waves-effect" data-type="reload">查询</button>
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
                            <table class="layui-hide table table-striped" id="layList" lay-filter="layList"></table>
                            <script type="text/html" id="barDemo">
                                <button class="btn btn-success btn-xs waves-effect changButton" lay-event="edit">修改</button>
                                <button class="btn btn-info btn-xs waves-effect changButton" lay-event="detail">预览</button>
                                <button class="btn btn-danger btn-xs waves-effect changButton" lay-event="del">删除</button>
                            </script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<jsp:include page="../../include/footer_new_list.jsp"></jsp:include>

<!-- Js -->
<script type="text/javascript" src="static/js/modules/xtgl/role/list.js"></script>
<script type="text/javascript" src="static/js/modules/common/common_list.js"></script>
</body>

</html>