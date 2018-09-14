/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'STAFF_CODE',title: '职员编号',width:150}
            ,{field:'STAFF_NAME',title: '姓名',width:120}
            ,{field:'DEPT_NAME',title: '部门',width:120}
            ,{field:'POST_NAME',title: '职位',width:120}
            ,{field:'ATTENCE_TYPE', title: '申请类型',align:'center',width:140}
            ,{field:'STATUS', title: '状态', align:'center',width:100}
            ,{field:'ATTENCE_ID', title: '操作', align:'center', toolbar: '#barDemo',width:270}
            ,{field:'REJECT_REASON', title: '驳回原因',width:200}
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
                        METHOD:'staffAttence_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){ 
                        //分类显示中文名称
                        $("[data-field='ATTENCE_TYPE']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">转正申请</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">离职申请</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">工作交接</span>')
                            }
                        })
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">申请中</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已通过</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">已驳回</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.ATTENCE_ID,data.ATTENCE_TYPE);
                    } else if(obj.event === 'adopt'){
                        vm.adopt(data.ATTENCE_ID);
                    } else if(obj.event === 'reject'){
                        vm.reject(data.ATTENCE_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var STAFF_CODE_SEARCH = $('#STAFF_CODE_SEARCH').val();
                        var STAFF_NAME_SEARCH = $('#STAFF_NAME_SEARCH').val();
                        var DEPT_ID_SEARCH = $('#DEPT_ID_SEARCH').val();
                        var POST_SEARCH = $('#POST_SEARCH').val();
                        var ATTENCE_TYPE_SEARCH = $('#ATTENCE_TYPE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                STAFF_CODE_SEARCH: STAFF_CODE_SEARCH,
                                STAFF_NAME_SEARCH: STAFF_NAME_SEARCH,
                                DEPT_ID_SEARCH:DEPT_ID_SEARCH,
                                POST_SEARCH:POST_SEARCH,
                                ATTENCE_TYPE_SEARCH:ATTENCE_TYPE_SEARCH
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
        view:function(ATTENCE_ID,ATTENCE_TYPE){
            openBootStrapDialog("","staff/attence/entry?type=view&ATTENCE_ID="+ATTENCE_ID +"&attence_type=" + ATTENCE_TYPE,"1");
        },
        adopt:function(ATTENCE_ID){
            swal({
                title: "",
                text: "确认要通过这条申请?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=staffAttence_updateStatus",{
                    ATTENCE_ID:ATTENCE_ID,
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
        reject:function(ATTENCE_ID){
            swal({
                    title: "驳回",
                    text: "请输入驳回的原因！",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "驳回原因"
                },
                function(inputValue){
                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("请输入驳回原因！");
                        return false
                    }
                    myjstools.ajax(false, "POST", "/web/service?METHOD=staffAttence_updateStatus",{
                        ATTENCE_ID:ATTENCE_ID,
                        STATUS:"3",
                        REJECT_REASON:inputValue
                    }, function(data){
                        try {
                            if (data.success != 1) {
                                swal({title:'',text:data.msg,type:'error'});
                                return false;
                            }
                            swal('','驳回成功!','success');
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