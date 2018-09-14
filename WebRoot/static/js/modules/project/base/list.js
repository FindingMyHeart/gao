/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
             {type:'numbers',fixed: 'left'}
            ,{field:'PROJECT_NAME',title: '项目名称',width:150}
            ,{field:'CREATE_DATE',title: '建档日期',width:120}
            ,{field:'MANAGER_NAME',title: '项目经理',width:120}
            ,{field:'PROJECT_ADDRESS',title: '施工地点',width:180}
            ,{field:'STATUS', title: '项目状态',align:'center',width:140}
            ,{field:'PROJECT_ID', title: '操作',align:'center', toolbar: '#barDemo',width:420,fixed: 'right'}
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
                        METHOD:'projectInfo_list'
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
                                $(this).html('<span class="badge badge-info">新建</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已提交</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">被驳回</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">进行中</span>')
                            }else if($(this).text()=='5'){
                                $(this).html('<span class="badge badge-default">审核通过</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
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
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var PROJECT_STATUS_SEARCH = $('#PROJECT_STATUS_SEARCH').val();
                        var CONSTRUCTION_ADRESS_SEARCH = $('#CONSTRUCTION_ADRESS_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                PROJECT_ID_SEARCH: PROJECT_ID_SEARCH,
                                PROJECT_STATUS_SEARCH: PROJECT_STATUS_SEARCH,
                                CONSTRUCTION_ADRESS_SEARCH:CONSTRUCTION_ADRESS_SEARCH
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
            openBootStrapDialog("","project/entry?type=save","1");
        },
        edit:function(PROJECT_ID){
            openBootStrapDialog("","project/entry?type=edit&PROJECT_ID="+PROJECT_ID,"1");
        },
        view:function(PROJECT_ID){
            openBootStrapDialog("","project/entry?type=view&PROJECT_ID="+PROJECT_ID,"1");
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=projectInfo_delete",{
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