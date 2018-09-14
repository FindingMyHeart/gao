/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'LOCATION_NAME',title: '库位名称',width:120}
            ,{field:'LOCATION_ADDRESS',title: '库位地点',width:100}
            ,{field:'LOCATION_MAN',title: '库位负责人',width:120}
            ,{field:'LOCATION_MANTEL',title: '负责人电话',width:150}
            ,{field:'MEMO', title: '备注',width:200}
            ,{field:'LOCATION_ID', title: '操作', align:'center', toolbar: '#barDemo'}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#kwgl'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'kwgl_list'
                    }
                    ,id: 'kwglReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(kwgl)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.LOCATION_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.LOCATION_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.LOCATION_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var location_name_search = $('#location_name_search').val();
                        //执行重载
                        table.reload('kwglReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                location_name_search: location_name_search
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
            openBootStrapDialog("","store/kwgl/entry?type=save","1");
        },
        edit:function(LOCATION_ID){
            openBootStrapDialog("","store/kwgl/entry?type=edit&LOCATION_ID="+LOCATION_ID,"1");
        },
        view:function(LOCATION_ID){
            openBootStrapDialog("","store/kwgl/entry?type=view&LOCATION_ID="+LOCATION_ID,"1");
        },
        delete:function(LOCATION_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=kwgl_delete",{
                    LOCATION_ID:LOCATION_ID
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