/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'CERT_CODE',title: '资质编号',width:150}
            ,{field:'CERT_NAME',title: '资质名称',width:200}
            ,{field:'VALID_DATE',title: '有效期',width:120}
            ,{field:'USE_CASE',title: '使用情况',align:'center',width:120}
            ,{field:'CERT_ID', title: '操作', toolbar: '#barDemo',align:'center',width:360}
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
                        METHOD:'cert_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='USE_CASE']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">在库</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已借出</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">已催还</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">丢失</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.CERT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.CERT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.CERT_ID);
                    } else if(obj.event === 'lend'){
                        vm.lend(data.CERT_ID);
                    } else if(obj.event === 'recharge'){ //催还
                        vm.recharge(data.CERT_ID);
                    } else if(obj.event === 'return'){ //归还
                        vm.return(data.CERT_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var CERT_CODE_SEARCH = $('#CERT_CODE_SEARCH').val();
                        var CERT_NAME_SEARCH = $('#CERT_NAME_SEARCH').val();
                        var USE_CASE_SEARCH = $('#USE_CASE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                CERT_CODE_SEARCH: CERT_CODE_SEARCH,
                                CERT_NAME_SEARCH:CERT_NAME_SEARCH,
                                USE_CASE_SEARCH:USE_CASE_SEARCH
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
            openBootStrapDialog("","adm/cert/entry?type=save","1");
        },
        edit:function(CERT_ID){
            openBootStrapDialog("","adm/cert/entry?type=edit&CERT_ID="+CERT_ID,"1");
        },
        view:function(CERT_ID){
            openBootStrapDialog("","adm/cert/entry?type=view&CERT_ID="+CERT_ID,"1");
        },
        lend:function (CERT_ID) {
            swal({
                    title: "借用",
                    text: "请输入借用人！",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "借用人"
                },
                function(inputValue){
                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("请输入借用人！");
                        return false
                    }
                    myjstools.ajax(false, "POST", "/web/service?METHOD=certLend_save",{
                        CERT_ID:CERT_ID,
                        LEND_NAME:inputValue
                    }, function(data){
                        try {
                            if (data.success != 1) {
                                swal({title:'',text:data.msg,type:'error'});
                                return false;
                            }
                            swal('','借用成功!','success');
                            //刷新列表
                            $(".layListTable .btn").click();
                        } catch (e) {
                            //alert("login_res.error:出错了！" + e.message);
                        }
                    });
                });
        },
        delete:function(CERT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=cert_delete",{
                    CERT_ID:CERT_ID
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
        recharge:function(CERT_ID){
            swal({
                title: "",
                text: "确认要催还这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=cert_updateUseCase",{
                    CERT_ID:CERT_ID,
                    USE_CASE:"3"
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
        return:function(CERT_ID){
            swal({
                title: "",
                text: "确认要归还这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=cert_updateUseCase",{
                    CERT_ID:CERT_ID,
                    USE_CASE:"1"
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
        }
    },
    mounted:function(){

    }
});

$(function(){
    vm.initTable();
});