var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'RETURN_SN',title: '退货单号',width:140}
            ,{field:'RETURN_NAME',title: '退货人',width:120}
            ,{field:'RETURN_DATE',title: '退货日期',width:120}
            ,{field:'RETURN_ID', title: '操作', align:'center', toolbar: '#barDemo',width:300}
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
                        METHOD:'buyReturn_list',
                        BUY_TYPE:'2'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.RETURN_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.RETURN_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.RETURN_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.RETURN_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var RETURN_SN_SEARCH = $('#RETURN_SN_SEARCH').val();
                        var STAFF_NAME_SEARCH = $('#STAFF_NAME_SEARCH').val();
                        var RETURN_DATE_SEARCH = $('#RETURN_DATE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                RETURN_SN_SEARCH: RETURN_SN_SEARCH,
                                STAFF_NAME_SEARCH:STAFF_NAME_SEARCH,
                                RETURN_DATE_SEARCH:RETURN_DATE_SEARCH
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
            openBootStrapDialog("","buy/materialBuy/return_entry?type=save","1");
        },
        edit:function(RETURN_ID){
            openBootStrapDialog("","buy/materialBuy/return_entry?type=edit&RETURN_ID="+RETURN_ID,"1");
        },
        view:function(RETURN_ID){
            openBootStrapDialog("","buy/materialBuy/return_entry?type=view&RETURN_ID="+RETURN_ID,"1");
        },

        delete:function(RETURN_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyReturn_delete",{
                    RETURN_ID:RETURN_ID
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
        close:function(RETURN_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyReturn_updateStatus",{
                    RETURN_ID:RETURN_ID,
                    REPAIR_STATUS:"1000027"
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','关闭成功!','success');
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
            elem: '#RETURN_DATE_SEARCH' //指定元素
        });
    });
});