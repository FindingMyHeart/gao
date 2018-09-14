/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'ASSET_CODE',title: '资产编号',width:150}
            ,{field:'ASSET_NAME',title: '资产名称',width:120}
            ,{field:'STAFF_NAME',title: '所属人',width:120}
            ,{field:'DEPT_NAME',title: '所属部门',width:120}
            ,{field:'CREATE_DATE', title: '登记日期',width:140}
            ,{field:'BUY_DATE', title: '购入日期',width:140}
            ,{field:'ASSET_NUM', title: '数量',width:100}
            ,{field:'STATUS', title: '资产状态',align:'center',width:100}
            ,{field:'ASSET_ID', title: '操作', align:'center', toolbar: '#barDemo',width:350}
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
                        METHOD:'asset_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">正常</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">报废</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">变卖</span>')
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
                    	vm.view(data.ASSET_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.ASSET_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.ASSET_ID);
                    } else if(obj.event === 'scrap'){  //报废
                        vm.scrap(data.ASSET_ID);
                    } else if(obj.event === 'sell_off'){  //变卖
                        vm.sell_off(data.ASSET_ID);
                    } else if(obj.event === 'lose'){  //丢失
                        vm.lose(data.ASSET_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var ASSET_CODE_SEARCH = $('#ASSET_CODE_SEARCH').val();
                        var ASSET_NAME_SEARCH = $('#ASSET_NAME_SEARCH').val();
                        var USER_NAME_SEARCH = $('#USER_NAME_SEARCH').val();
                        var DEPT_ID_SEARCH = $('#DEPT_ID_SEARCH').val();
                        var STATUS_SEARCH = $('#STATUS_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                ASSET_CODE_SEARCH: ASSET_CODE_SEARCH,
                                ASSET_NAME_SEARCH:ASSET_NAME_SEARCH,
                                USER_NAME_SEARCH:USER_NAME_SEARCH,
                                DEPT_ID_SEARCH:DEPT_ID_SEARCH,
                                STATUS_SEARCH:STATUS_SEARCH
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
            openBootStrapDialog("","adm/asset/entry?type=save","1");
        },
        edit:function(ASSET_ID){
            openBootStrapDialog("","adm/asset/entry?type=edit&ASSET_ID="+ASSET_ID,"1");
        },
        view:function(ASSET_ID){
            openBootStrapDialog("","adm/asset/entry?type=view&ASSET_ID="+ASSET_ID,"1");
        },
        delete:function(ASSET_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=asset_delete",{
                    ASSET_ID:ASSET_ID
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
        scrap:function(ASSET_ID){
            swal({
                title: "",
                text: "确认设置此资产为：报废?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=asset_updateStatus",{
                    ASSET_ID:ASSET_ID,
                    STATUS:"2"
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
        sell_off:function(ASSET_ID){
            swal({
                title: "",
                text: "确认设置此资产为：变卖?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=asset_updateStatus",{
                    ASSET_ID:ASSET_ID,
                    STATUS:"3"
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
        lose:function(ASSET_ID){
            swal({
                title: "",
                text: "确认设置此资产为：丢失?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=asset_updateStatus",{
                    ASSET_ID:ASSET_ID,
                    STATUS:"4"
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