/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'FEE_SN',title: '订单号',width:150}
            ,{field:'PROJECT_NAME',title: '项目名称',width:120}
            ,{field:'CONTRACT_PRICE',title: '项目金额',width:140}
            ,{field:'CONTRACT_PRICE', title: '开票金额',width:140}
            ,{field:'UN_PAY_MONEY', title: '结算金额',width:140}
            ,{field:'ADD_ACCOUNT_MONEY', title: '未收款金额',width:100}
            ,{field:'FEE_ID', title: '操作', align:'center', toolbar: '#barDemo',width:300}
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
                        METHOD:'projectInfo_yskdList'
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
                                $(this).html('<span class="badge badge-success">申请通过</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">被驳回</span>')
                            }
                        })
                        $("[data-field='CAIWU_STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">新建</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">完成</span>')
                            }
                        })
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.FEE_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.FEE_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.FEE_ID);
                    } else if(obj.event === 'addInfo'){  //添加信息
                        vm.addInfo(data.FEE_ID);
                    } else if(obj.event === 'complete'){  //完成
                        vm.complete(data.FEE_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var FEE_SN_SEARCH = $('#FEE_SN_SEARCH').val();
                        var DEPT_ID_SEARCH = $('#DEPT_ID_SEARCH').val();
                        var CREATE_USERID_SEARCH = $('#CREATE_USERID_SEARCH').val();
                        var FEE_TYPE_SEARCH = $('#FEE_TYPE_SEARCH').val();
                        var CREATE_DATE_SEARCH = $('#CREATE_DATE_SEARCH').val();
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var CAIWU_STATUS_SEARCH = $('#CAIWU_STATUS_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                FEE_SN_SEARCH: FEE_SN_SEARCH,
                                DEPT_ID_SEARCH: DEPT_ID_SEARCH,
                                CREATE_USERID_SEARCH:CREATE_USERID_SEARCH,
                                FEE_TYPE_SEARCH:FEE_TYPE_SEARCH,
                                CREATE_DATE_SEARCH:CREATE_DATE_SEARCH,
                                PROJECT_ID_SEARCH:PROJECT_ID_SEARCH,
                                CAIWU_STATUS_SEARCH:CAIWU_STATUS_SEARCH,
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
        edit:function(FEE_ID){
            openBootStrapDialog("","cw/feeApply/entry?type=edit&FEE_ID="+FEE_ID,"1");
        },
        view:function(FEE_ID){
            openBootStrapDialog("","cw/feeApply/entry?type=view&FEE_ID="+FEE_ID,"1");
        },
        addInfo:function(FEE_ID){ //转正申请
            openBootStrapDialog("","cw/feeApply/entry?type=addInfo&FEE_ID="+FEE_ID,"1");
        },
        complete:function(FEE_ID){
            swal({
                title: "",
                text: "确认要完成这条记录吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#1f91f3',
                cancelButtonColor: '#d33',
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                closeOnConfirm: false
            }, function() {
                myjstools.ajax(false, "POST", "/web/service?METHOD=feeApply_complete",{
                    FEE_ID:FEE_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','设置完成成功!','success');
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