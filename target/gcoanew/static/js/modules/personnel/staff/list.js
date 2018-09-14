/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'staff_code',title: '员工编号',width:120}
            ,{field:'staff_name',title: '姓名',width:100}
            ,{field:'staff_sex',title: '性别',width:120}
            ,{field:'dept_name',title: '部门',width:100}
            ,{field:'post_name', title: '职位',width:100}
            ,{field:'contact', title: '联系电话',width:120}
            ,{field:'staff_status_name', title: '状态',align:'center',width:120}
            ,{field:'vacation_type_name', title: '休假类型',width:120}
            ,{field:'staff_id', title: '操作',width:300,align:'center', toolbar: '#barDemo'}
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
                        METHOD:'staffManage_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        $("[data-field='address']").css('display','none');
                        //分类显示中文名称
                        $("[data-field='staff_sex']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('男')
                            }else if($(this).text()=='2'){
                                $(this).html('女')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.staff_id);
                    } else if(obj.event == 'del'){
                        vm.delete(data.staff_id);
                    } else if(obj.event == 'edit'){
                        vm.edit(data.staff_id);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var staff_name_search = $('#staff_name_search').val();
                        var dept_id_search = $('#dept_id_search').val();
                        var post_search = $('#post_search').val();
                        var staff_status_search = $('#staff_status_search').val();
                        var vacation_type_search = $('#vacation_type_search').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                staff_name_search: staff_name_search,
                                dept_id_search:dept_id_search,
                                post_search:post_search,
                                staff_status_search:staff_status_search,
                                vacation_type_search:vacation_type_search
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
            openBootStrapDialog("","staff/entry?type=save","1");
        },
        edit:function(staff_id){
            openBootStrapDialog("","staff/entry?type=edit&staff_id="+staff_id,"1");
        },
        view:function(staff_id){
        	openBootStrapDialog("","staff/entry?type=view&staff_id="+staff_id,"1");
        },
       delete:function(staff_id){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=staffManage_delete",{
                    staff_id:staff_id
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