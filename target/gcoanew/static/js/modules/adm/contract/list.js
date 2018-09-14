/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers'}
            ,{field:'CONTRACT_CODE',title: '合同编号',width:150}
            ,{field:'CONTRACT_NAME',title: '合同名称',width:120}
            ,{field:'CONTRACT_TYPE_NAME',title: '合同类型',width:120}
            ,{field:'USE_CASE',title: '使用情况',align:'center',width:120}
            ,{field:'CONTRACT_ID', title: '操作', align:'center', toolbar: '#barDemo',width:420}
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
                        METHOD:'contract_list'
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
                                $(this).html('<span class="badge badge-success">借出</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">催还</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">逾期</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.CONTRACT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.CONTRACT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.CONTRACT_ID);
                    } else if(obj.event === 'lend'){
                        vm.lend(data.CONTRACT_ID);
                    } else if(obj.event === 'recharge'){ //催还
                        vm.recharge(data.CONTRACT_ID);
                    } else if(obj.event === 'return'){ //归还
                        vm.return(data.CONTRACT_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var CONTRACT_CODE_SEARCH = $('#CONTRACT_CODE_SEARCH').val();
                        var CONTRACT_NAME_SEARCH = $('#CONTRACT_NAME_SEARCH').val();
                        var CONTRACT_TYPE_SEARCH = $('#CONTRACT_TYPE_SEARCH').val();
                        var USE_CASE_SEARCH = $('#USE_CASE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                CONTRACT_CODE_SEARCH: CONTRACT_CODE_SEARCH,
                                CONTRACT_NAME_SEARCH:CONTRACT_NAME_SEARCH,
                                CONTRACT_TYPE_SEARCH:CONTRACT_TYPE_SEARCH,
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
            openBootStrapDialog("","adm/contract/entry?type=save","1");
        },
        edit:function(CONTRACT_ID){
            openBootStrapDialog("","adm/contract/entry?type=edit&CONTRACT_ID="+CONTRACT_ID,"1");
        },
        view:function(CONTRACT_ID){
            openBootStrapDialog("","adm/contract/entry?type=view&CONTRACT_ID="+CONTRACT_ID,"1");
        },
        delete:function(CONTRACT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=contract_delete",{
                    CONTRACT_ID:CONTRACT_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".layListTable .layui-btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        lend:function (CONTRACT_ID) {
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
                    myjstools.ajax(false, "POST", "/web/service?METHOD=contractLend_save",{
                        CONTRACT_ID:CONTRACT_ID,
                        LEND_NAME:inputValue
                    }, function(data){
                        try {
                            if (data.success != 1) {
                                swal({title:'',text:data.msg,type:'error'});
                                return false;
                            }
                            swal('','借用成功!','success');
                            //刷新列表
                            $(".layListTable .layui-btn").click();
                        } catch (e) {
                            //alert("login_res.error:出错了！" + e.message);
                        }
                    });
                });
        },
        recharge:function(CONTRACT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=contract_updateUseCase",{
                    CONTRACT_ID:CONTRACT_ID,
                    USE_CASE:"3"
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','操作成功!','success');
                        //刷新列表
                        $(".layListTable .layui-btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        return:function(CONTRACT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=contract_updateUseCase",{
                    CONTRACT_ID:CONTRACT_ID,
                    USE_CASE:"1"
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','操作成功!','success');
                        //刷新列表
                        $(".layListTable .layui-btn").click();
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