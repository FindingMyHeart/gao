/**
 * Created by 11029 on 2018/5/1.
 */

var vm = new Vue({
    el:"body",
    data:{
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'INVOICE_SN',title: '订单号',width:150}
            ,{field:'DEPT_NAME',title: '部门',width:120}
            ,{field:'CREATE_USER_NAME',title: '建档人',width:120}
            ,{field:'CREATE_DATE',title: '建档日期',width:120}
            ,{field:'SUPPLIER_NAME', title: '供应商',width:140}
            ,{field:'INVOICE_DATE', title: '开票日期',width:140}
            ,{field:'AMOUNT_MONEY', title: '金额',width:140}
            ,{field:'PROJECT_LOCATION', title: '项目地方',width:140}
            ,{field:'MEMO', title: '备注',width:140}
            ,{field:'INVOICE_ID', title: '操作', align:'center', toolbar: '#barDemo',width:300}
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
                        METHOD:'invoiceInfo_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                    ,done: function(res, page, count){
                        //分类显示中文名称
                        $("[data-field='TRANSFER_TYPE']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">转正</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">离职</span>')
                            }else if($(this).text()=='3'){
                                $(this).html('<span class="badge badge-danger">工作交接</span>')
                            }
                        })
                        //分类显示中文名称
                        $("[data-field='STATUS']").children().each(function(){
                            if($(this).text()=='1'){
                                $(this).html('<span class="badge badge-info">申请中</span>')
                            }else if($(this).text()=='2'){
                                $(this).html('<span class="badge badge-success">已同意</span>')
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
                        vm.view(data.INVOICE_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.INVOICE_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.INVOICE_ID);
                    } else if(obj.event === 'scrap'){  //报废
                        vm.scrap(data.INVOICE_ID);
                    } else if(obj.event === 'sell_off'){  //变卖
                        vm.sell_off(data.INVOICE_ID);
                    } else if(obj.event === 'lose'){  //丢失
                        vm.lose(data.INVOICE_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var INVOICE_SN_SEARCH = $('#INVOICE_SN_SEARCH').val();
                        var DEPT_ID_SEARCH = $('#DEPT_ID_SEARCH').val();
                        var CREATE_USERID_SEARCH = $('#CREATE_USERID_SEARCH').val();
                        var SUPPLIER_ID_SEARCH = $('#SUPPLIER_ID_SEARCH').val();
                        var INVOICE_DATE_SEARCH = $('#INVOICE_DATE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                INVOICE_SN_SEARCH: INVOICE_SN_SEARCH,
                                DEPT_ID_SEARCH: DEPT_ID_SEARCH,
                                CREATE_USERID_SEARCH:CREATE_USERID_SEARCH,
                                SUPPLIER_ID_SEARCH:SUPPLIER_ID_SEARCH,
                                INVOICE_DATE_SEARCH:INVOICE_DATE_SEARCH
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
        save:function(){ //转正申请
            openBootStrapDialog("","cw/invoiceInfo/entry?type=save&transfer_type=1","1");
        },
        edit:function(INVOICE_ID){
            openBootStrapDialog("","cw/invoiceInfo/entry?type=edit&INVOICE_ID="+INVOICE_ID,"1");
        },
        view:function(INVOICE_ID){
            openBootStrapDialog("","cw/invoiceInfo/entry?type=view&INVOICE_ID="+INVOICE_ID,"1");
        },
        delete:function(INVOICE_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=invoiceInfo_delete",{
                    INVOICE_ID:INVOICE_ID
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

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#INVOICE_DATE_SEARCH' //指定元素
        });
    });
});