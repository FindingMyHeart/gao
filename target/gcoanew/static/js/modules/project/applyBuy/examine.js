var vm = new Vue({
    el:"body",
    data:{
        APPLY_USERID:'',
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'APPLYBUY_SN',title: '申购订单号',width:140}
            ,{field:'APPLY_DATE',title: '申购日期',width:120}
            ,{field:'PROJECT_NAME',title: '项目名称',width:200}
            ,{field:'SYSTEM_NAME',title: '系统名称',width:120}
            ,{field:'APPLY_NAME',title: '申请人',width:120}
            ,{field:'STATUS',title: '状态',align:'center',width:100}
            ,{field:'APPLYBUY_ID', title: '操作', align:'center', toolbar: '#barDemo',width:260}
            ,{field:'REJECT_REASON',title: '驳回原因',width:300}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#layList'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'applyBuy_list',
                        SHENHE:'SHENHE'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        $("[data-field='SYSTEM_NAME']").css('display','none');
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">新建</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已提交</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">被驳回</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">进行中</span>')
                            }else if($(this).text()=='5'){
                                $(this).html('<span class="badge badge-default">已完成</span>')
                            }
                        });
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.APPLYBUY_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.APPLYBUY_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.APPLYBUY_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.APPLYBUY_ID);
                    } else if(obj.event === 'submit'){
                        vm.submit(data.APPLYBUY_ID,'2');
                    } else if(obj.event === 'adopt'){
                        vm.adopt(data.APPLYBUY_ID,'5');
                    } else if(obj.event === 'reject'){
                        vm.reject(data.APPLYBUY_ID,'3');
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var APPLYBUY_SN_SEARCH = $('#APPLYBUY_SN_SEARCH').val();
                        var APPLYBUY_DATE_SEARCH = $('#APPLYBUY_DATE_SEARCH').val();
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var APPLY_ID_SEARCH = $('#APPLY_ID_SEARCH').val();
                        var STATUS_SEARCH = $('#STATUS_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                APPLYBUY_SN_SEARCH: APPLYBUY_SN_SEARCH,
                                APPLYBUY_DATE_SEARCH:APPLYBUY_DATE_SEARCH,
                                PROJECT_ID_SEARCH:PROJECT_ID_SEARCH,
                                STATUS_SEARCH:STATUS_SEARCH,
                                APPLY_ID_SEARCH:APPLY_ID_SEARCH
                            }
                        });
                    }
                };

                $('.layListTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });
            });
        },
        save:function(){
            openBootStrapDialog("","applyBuy/entry?type=save","1");
        },
        edit:function(APPLYBUY_ID){
            openBootStrapDialog("","applyBuy/entry?type=edit&APPLYBUY_ID="+APPLYBUY_ID,"1");
        },
        view:function(APPLYBUY_ID){
            openBootStrapDialog("","applyBuy/entry?type=view&APPLYBUY_ID=" + APPLYBUY_ID,"1");
        },
        delete:function(APPLYBUY_ID){
            swal({
                title: "",
                text: "确认要删除这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=applyBuy_delete",{
                    APPLYBUY_ID:APPLYBUY_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".layListTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        adopt:function(APPLYBUY_ID){
            swal({
                title: "",
                text: "确认要通过这条申请?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=applyBuy_updateStatus",{
                    APPLYBUY_ID:APPLYBUY_ID,
                    STATUS:"5"
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','操作成功!','success');
                        //刷新列表
                        $(".layListTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        reject:function(APPLYBUY_ID){
            swal({
                    title: "驳回",
                    text: "请输入驳回的原因！",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "驳回原因"
                },
                function(inputValue){
                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("请输入驳回原因！");
                        return false
                    }
                    myjstools.ajax(false, "POST", "/web/service?METHOD=applyBuy_updateStatus",{
                        APPLYBUY_ID:APPLYBUY_ID,
                        STATUS:"3",
                        REJECT_REASON:inputValue
                    }, function(data){
                        try {
                            if (data.success != 1) {
                                swal({title:'',text:data.msg,type:'error'});
                                return false;
                            }
                            swal('','驳回成功!','success');
                            //刷新列表
                            $(".layListTable .btn").click();
                        } catch (e) {
                            //alert("login_res.error:出错了！" + e.message);
                        }
                    });
                });
        }
    },
    mounted:function(){

    }
});

$(function(){
    vm.initTable();
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#APPLYBUY_DATE_SEARCH' //指定元素
        });
    });
});