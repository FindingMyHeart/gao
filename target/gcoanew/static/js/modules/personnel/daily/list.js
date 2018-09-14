/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
             {type:'numbers',fixed: 'left'}
            ,{field:'DAILY_TYPE',title: '报告类型',width:120}
            ,{field:'STAFF_CODE',title: '职员编号',width:120}
            ,{field:'STAFF_NAME',title: '姓名',width:100}
            ,{field:'DEPT_NAME',title: '部门',width:120}
            ,{field:'POST_NAME',title: '职位',width:100}
            ,{field:'TX_DATE', title: '日期',width:150}
            ,{field:'DAILY_ID', title: '操作', align:'center', toolbar: '#barDemo',width:300}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#daily'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'daily_list'
                    }
                    ,id: 'dailyReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='DAILY_TYPE']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('日报');
                            }else if($(this).text()=='2'){
                                $(this).html('周报');
                            }else if($(this).text()=='3'){
                                $(this).html('月报');
                            }
                        })

                    }
                });
                //监听工具条
                table.on('tool(daily)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.DAILY_ID,data.DAILY_TYPE);
                    } else if(obj.event === 'del'){
                        vm.delete(data.DAILY_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.DAILY_ID,data.DAILY_TYPE);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var STAFF_CODE_SEARCH = $('#STAFF_CODE_SEARCH').val();
                        var STAFF_NAME_SEARCH = $('#STAFF_NAME_SEARCH').val();
                        var DEPT_ID_SEARCH = $('#DEPT_ID_SEARCH').val();
                        var POST_SEARCH = $('#POST_SEARCH').val();
                        var DAILY_TYPE_SEARCH = $('#DAILY_TYPE_SEARCH').val();
                        var CREATE_DATE_SEARCH = $('#CREATE_DATE_SEARCH').val();
                        //执行重载
                        table.reload('dailyReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                STAFF_CODE_SEARCH: STAFF_CODE_SEARCH,
                                STAFF_NAME_SEARCH: STAFF_NAME_SEARCH,
                                DEPT_ID_SEARCH: DEPT_ID_SEARCH,
                                POST_SEARCH: POST_SEARCH,
                                DAILY_TYPE_SEARCH: DAILY_TYPE_SEARCH,
                                CREATE_DATE_SEARCH: CREATE_DATE_SEARCH,
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
            openBootStrapDialog("","daily/entry?type=save","1");
        },
        save1:function(){  //日报
            openBootStrapDialog("","daily/entry?type=save&DAILY_TYPE=1","1");
        },
        save2:function(){  //周报
            openBootStrapDialog("","daily/entry?type=save&DAILY_TYPE=2","1");
        },
        save3:function(){  //月
            openBootStrapDialog("","daily/entry?type=save&DAILY_TYPE=3","1");
        },
        view:function(DAILY_ID,DAILY_TYPE){
            openBootStrapDialog("","daily/entry?type=view&DAILY_ID="+DAILY_ID + "&DAILY_TYPE=" + DAILY_TYPE,"1");
        },
        edit:function(DAILY_ID,DAILY_TYPE){
            openBootStrapDialog("","daily/entry?type=edit&DAILY_ID="+DAILY_ID + "&DAILY_TYPE=" + DAILY_TYPE,"1");
        },
        delete:function(DAILY_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=daily_delete",{
                    DAILY_ID:DAILY_ID
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
    $('#CREATE_DATE_SEARCH').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
});