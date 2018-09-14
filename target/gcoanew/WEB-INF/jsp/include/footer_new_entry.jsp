<!-- jquery.js -->
<script type="text/javascript" src="static/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="static/js/modules/common/myjstools.js"></script>

<script src="static/plugins/bootstrap/js/bootstrap.min.js"></script>

<script src="static/plugins/momentjs/moment.js"></script>
<script src="static/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

<!-- layUI -->
<script src="static/plugins/layui/layui.js"></script>
<!-- sweetAlert -->
<link rel="stylesheet" href="static/plugins/sweetalert/sweetalert.css">
<script type="text/javascript" src="static/plugins/sweetalert/sweetalert.min.js"></script>

<!-- vue -->
<script type="text/javascript" src="static/js/vue.js"></script>
<script type="text/javascript">
    $("#entry_qx").on('click',function(){
        // 获得frame索引
        var index = parent.layer.getFrameIndex(window.name);
        //关闭当前frame
        parent.layer.close(index);
        // parent.vm.initTable();
        $(window.parent.document).contents().find("#mainFrame")[0].contentWindow.vm.initTable();
    });
</script>
