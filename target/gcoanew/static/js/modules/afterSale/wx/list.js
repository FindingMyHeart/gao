/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
             {type:'numbers',fixed: 'left'}
            ,{field:'REPAIR_NO',title: '维修单号',width:140}
            ,{field:'BAOXIU_DATE',title: '报修日期',width:120}
            ,{field:'PERSONNEL_NAMES',title: '维修人员',width:200}
            ,{field:'REPAIR_STATUS_NAME',title: '状态',align:'center',width:100}
            ,{field:'REPAIR_ID', title: '操作', align:'center', toolbar: '#barDemo',width:450}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#afterSaleRepair'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'afterSaleRepair_list'
                    }
                    ,id: 'afterSaleRepairReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(afterSaleRepair)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.REPAIR_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.REPAIR_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.REPAIR_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.REPAIR_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var REPAIR_STATUS_SEARCH = $('#REPAIR_STATUS_SEARCH').val();
                        var BAOXIU_TIME_SEARCH = $('#BAOXIU_TIME_SEARCH').val();
                        //执行重载
                        table.reload('afterSaleRepairReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                PROJECT_ID_SEARCH: PROJECT_ID_SEARCH,
                                REPAIR_STATUS_SEARCH:REPAIR_STATUS_SEARCH,
                                BAOXIU_TIME_SEARCH:BAOXIU_TIME_SEARCH
                            }
                        });
                    }
                };

                $('.afterSaleRepairTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });
            });
        },
        save:function(){
            openBootStrapDialog("","afterSale/repair/entry?type=save","1");
        },
        edit:function(REPAIR_ID){
            openBootStrapDialog("","afterSale/repair/entry?type=edit&REPAIR_ID="+REPAIR_ID,"1");
        },
        view:function(REPAIR_ID){
            openBootStrapDialog("","afterSale/repair/entry?type=view&REPAIR_ID="+REPAIR_ID,"1");
        },

        delete:function(REPAIR_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleRepair_delete",{
                    REPAIR_ID:REPAIR_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".afterSaleRepairTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        },
        close:function(REPAIR_ID){
            swal({
                title: "",
                text: "确认要关闭这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleRepair_updateStatus",{
                    REPAIR_ID:REPAIR_ID,
                    REPAIR_STATUS:"1000027"
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','关闭成功!','success');
                        //刷新列表
                        $(".afterSaleRepairTable .btn").click();
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
            elem: '#BAOXIU_TIME_SEARCH' //指定元素
        });
    });
    
});