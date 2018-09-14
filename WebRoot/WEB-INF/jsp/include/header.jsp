<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<nav class="navbar clearHeader">
    <div class="col-12">
        <div class="navbar-header">
            <a href="javascript:void(0);" class="bars"></a>
            <a class="navbar-brand" href="main/index">Admin<img class="logo" src="static/images/logo.svg" alt="企业内部管理系统"></a>
        </div>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown menu-app">
                <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" title="快捷方式"> <i class="zmdi zmdi-apps"></i> </a>
                <ul class="dropdown-menu">
                    <li class="body">
                        <ul class="menu">
                            <li>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0)"><i class="zmdi zmdi-email"></i><span>邮件</span></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i class="zmdi zmdi-accounts-list"></i><span>联系人</span></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i class="zmdi zmdi-arrows"></i><span>记事本</span></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i class="zmdi zmdi-calendar-note"></i><span>日历</span></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="dropdown msg-notification">
                <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" title="邮件"> <i class="zmdi zmdi-email"></i>
                    <div class="notify"><span class="heartbit"></span><span class="point"></span></div>
                </a>
                <ul class="dropdown-menu">
                    <li class="header">邮件</li>
                    <li class="body">
                        <ul class="menu">
                            <li>
                                <a href="javascript:void(0);">
                                    <div class="icon-circle"> <img src="static/images/xs/avatar1.jpg" alt=""> </div>
                                    <div class="menu-info">
                                        <h4>标题</h4>
                                        <p class="ellipsis">摘要</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="footer">
                        <a href="javascript:void(0);">显示全部</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" title="通知"><i class="zmdi zmdi-notifications"></i>
                    <div class="notify"><span class="heartbit"></span><span class="point"></span></div>
                </a>
                <ul class="dropdown-menu">
                    <li class="header">通知</li>
                    <li class="body">
                        <ul class="menu">
                            <li>
                                <a href="javascript:void(0);">
                                    <div class="icon-circle bg-light-green"> <i class="material-icons">person_add</i> </div>
                                    <div class="menu-info">
                                        <h4>审批进度</h4>
                                        <p> <i class="material-icons">access_time</i> 1个小时以前 </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="footer">
                        <a href="javascript:void(0);">显示全部</a>
                    </li>
                </ul>
            </li>
            
            <li>
                <a href="logout" class="mega-menu" data-close="true"><i class="zmdi zmdi-power" title="退出"></i></a>
            </li>

            <li class="pull-right">
                <a href="javascript:void(0);" class="js-right-sidebar" data-close="true" title="设置"><i class="zmdi zmdi-sort-amount-desc"></i></a>
            </li>
        </ul>
    </div>
</nav>
