/**
 * Created by 11029 on 2018/5/1.
 */
var vm = new Vue({
    el:"body",
    data:{
        columns:[[
             {type:'numbers',fixed: 'left'}
            ,{field:'COMPANY_NAME',title: '单位名称',width:120}
            ,{field:'INVOICE_NAME',title: '开票名称',width:120}
            ,{field:'SOCIAL_CODE',title: '社会统一信用代码',width:80}
            ,{field:'OPEN_BANK',title: '开户行',width:150}
            ,{field:'BANK_ACCOUNT', title: '账号',width:150}
            ,{field:'TEL', title: '地址',width:150}
            ,{field:'ADDRESS', title: '电话',width:120}
            ,{field:'MEMO', title: '备注',width:120}
            ,{field:'INVOICE_ID', title: '操作', align:'center', toolbar: '#barDemo'}
        ]],
    },
    methods:{
        initTable:function(){
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#invoice'
                    ,url:myjstools.wwwroot +'/web/service'
                    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , where:{
                        METHOD:'invoice_list'
                    }
                    ,id: 'invoiceReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(invoice)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                    	vm.view(data.INVOICE_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.INVOICE_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.INVOICE_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var company_name_search = $('#company_name_search').val();
                        //执行重载
                        table.reload('invoiceReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                company_name_search:company_name_search
                            }
                        });
                    }
                };

                $('.invoiceTable .btn').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                });

            });
        },
        save:function(){
            openBootStrapDialog("","invoice/entry?type=save","1");
        },
        edit:function(INVOICE_ID){
            openBootStrapDialog("","invoice/entry?type=edit&INVOICE_ID="+INVOICE_ID,"1");
        },
        view:function(INVOICE_ID){
            openBootStrapDialog("","invoice/entry?type=view&INVOICE_ID="+INVOICE_ID,"1");
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=invoice_delete",{
                    INVOICE_ID:INVOICE_ID
                }, function(data){
                    try {
                        if (data.success != 1) {
                            swal({title:'',text:data.msg,type:'error'});
                            return false;
                        }
                        swal('','删除成功!','success');
                        //刷新列表
                        $(".invoiceTable .btn").click();
                    } catch (e) {
                        //alert("login_res.error:出错了！" + e.message);
                    }
                });
            });
        }
    }
});

$(function(){
    vm.initTable();
});