/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'CERT_CODE',title: '资质编号',width:150}
            ,{field:'CERT_NAME',title: '资质名称',width:200}
            ,{field:'USE_CASE',title: '使用情况',width:120}
            ,{field:'LEND_NAME',title: '借用人',width:120}
            ,{field:'STATUS',title: '申请状态',align:'center',width:120}
            ,{field:'LEND_ID', title: '操作', align:'center', toolbar: '#barDemo',width:200}
            ,{field:'REJECT_REASON',title: '驳回原因',width:280}
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
                        METHOD:'certLend_list'
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
                                $(this).html('<span class="badge badge-info">申请中</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">审核通过</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">已驳回</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-primary">已归还</span>')
                            }
                        })
                        $("[data-field='USE_CASE']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">在库</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已借出</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">已催还</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">丢失</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'adopt'){
                        vm.adopt(data.LEND_ID,data.CERT_ID);//同意
                    } else if(obj.event === 'reject'){
                        vm.reject(data.LEND_ID);//拒绝
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var CERT_CODE_SEARCH = $('#CERT_CODE_SEARCH').val();
                        var CERT_NAME_SEARCH = $('#CERT_NAME_SEARCH').val();
                        var USE_CASE_SEARCH = $('#USE_CASE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                CERT_CODE_SEARCH: CERT_CODE_SEARCH,
                                CERT_NAME_SEARCH:CERT_NAME_SEARCH,
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
        adopt:function(LEND_ID,CERT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=certLend_updateStatus",{
                    LEND_ID:LEND_ID,
                    CERT_ID:CERT_ID,
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
        reject:function(LEND_ID){
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
                    myjstools.ajax(false, "POST", "/web/service?METHOD=certLend_updateStatus",{
                        LEND_ID:LEND_ID,
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