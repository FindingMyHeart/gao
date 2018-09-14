var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'APPLYBUY_SN',title: '申购单号',width:140}
            ,{field:'BUY_SN',title: '采购订单号',width:130}
            ,{field:'APPLY_DATE',title: '申购日期',width:120}
            ,{field:'BUY_DATE',title: '采购日期',width:120}
            ,{field:'PROJECT_NAME',title: '项目名称',width:200}
            ,{field:'SYSTEM_NAME',title: '系统名称',width:120}
            ,{field:'SUPPLIER_NAME',title: '供应商',width:200}
            ,{field:'STATUS',title: '状态',align:'center',width:100}
            ,{field:'BUY_ID', title: '操作', align:'center', toolbar: '#barDemo',width:300}
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
                        METHOD:'buy_list',
                        BUY_TYPE:'2'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        $("[data-field='SYSTEM_NAME']").css('display','none');
                        $("[data-field='SUPPLIER_NAME']").css('display','none');
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">新建</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已通过</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">被驳回</span>')
                            }else if($(this).text()=='4'){
                                $(this).html('<span class="badge badge-info">进行中</span>')
                            }else if($(this).text()=='5'){
                                $(this).html('<span class="badge badge-default">已完成</span>')
                            }
                        });
                    }
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.BUY_ID,data.APPLYBUY_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.BUY_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.BUY_ID,data.APPLYBUY_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.BUY_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var BUY_SN_SEARCH = $('#BUY_SN_SEARCH').val();
                        var APPLYBUY_SN_SEARCH = $('#APPLYBUY_SN_SEARCH').val();
                        var BUY_DATE_SEARCH = $('#BUY_DATE_SEARCH').val();
                        var APPLY_DATE_SEARCH = $('#APPLY_DATE_SEARCH').val();
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                BUY_SN_SEARCH: BUY_SN_SEARCH,
                                APPLYBUY_SN_SEARCH:APPLYBUY_SN_SEARCH,
                                BUY_DATE_SEARCH:BUY_DATE_SEARCH,
                                APPLY_DATE_SEARCH:APPLY_DATE_SEARCH,
                                PROJECT_ID_SEARCH:PROJECT_ID_SEARCH
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
            openBootStrapDialog("","buy/materialBuy/entry?type=save","1");
        },
        edit:function(BUY_ID,APPLYBUY_ID){
            openBootStrapDialog("","buy/materialBuy/entry?type=edit&BUY_ID="+BUY_ID + "&APPLYBUY_ID=" + APPLYBUY_ID,"1");
        },
        view:function(BUY_ID,APPLYBUY_ID){
            openBootStrapDialog("","buy/materialBuy/entry?type=view&BUY_ID="+BUY_ID + "&APPLYBUY_ID=" + APPLYBUY_ID,"1");
        },
        close:function(BUY_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buy_updateStatus",{
                    BUY_ID:BUY_ID,
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
            elem: '#BUY_DATE_SEARCH' //指定元素
        });
        laydate.render({
            elem: '#APPLY_DATE_SEARCH' //指定元素
        });
    });

    $('select').searchableSelect();

    // $('#BUY_DATE_SEARCH').bootstrapMaterialDatePicker({
    //     format: 'YYYY-MM-DD',
    //     clearButton: true,
    //     weekStart: 1,
    //     time: false
    // });
    // $('#APPLY_DATE_SEARCH').bootstrapMaterialDatePicker({
    //     format: 'YYYY-MM-DD',
    //     clearButton: true,
    //     weekStart: 1,
    //     time: false
    // });
});