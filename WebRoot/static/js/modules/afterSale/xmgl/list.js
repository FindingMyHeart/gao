/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
             {type:'numbers',fixed: 'left'}
            ,{field:'PROJECT_NAME',title: '项目名称',width:120}
            ,{field:'PROJECT_DATE',title: '建档日期',width:100}
            ,{field:'MANAGER_NAME',title: '项目经理',width:120}
            ,{field:'PROJECT_ADDRESS',title: '施工地点',width:100}
            ,{field:'PROJECT_ID', title: '操作', align:'center', toolbar: '#barDemo',width:400}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#afterSaleProject'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'afterSaleProject_list'
                    }
                    ,id: 'afterSaleProjectReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(afterSaleProject)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	 vm.view(data.PROJECT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.PROJECT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.PROJECT_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var PROJECT_NAME_SEARCH = $('#PROJECT_NAME_SEARCH').val();
                        var MANAGER_USERID_SEARCH = $('#MANAGER_USERID_SEARCH').val();
                        //执行重载
                        table.reload('afterSaleProjectReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                PROJECT_NAME_SEARCH: PROJECT_NAME_SEARCH,
                                MANAGER_USERID_SEARCH:MANAGER_USERID_SEARCH
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
            openBootStrapDialog("","afterSale/project/entry?type=save","1");
        },
        edit:function(PROJECT_ID){
            openBootStrapDialog("","afterSale/project/entry?type=edit&PROJECT_ID="+PROJECT_ID,"1");
        },
        view:function(PROJECT_ID){
            openBootStrapDialog("","afterSale/project/entry?type=view&PROJECT_ID="+PROJECT_ID,"1");
        },
        delete:function(PROJECT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=afterSaleProject_delete",{
                    PROJECT_ID:PROJECT_ID
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
        }
    },
    mounted:function(){

    }
});

$(function(){
    vm.initTable();
});