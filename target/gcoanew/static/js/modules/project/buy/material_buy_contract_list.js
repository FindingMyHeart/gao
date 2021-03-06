var vm = new Vue({
    el:"body",
    data:{
        PROJECT_ID_SEARCH:'',//项目选择
        BILL_TYPE_SEARCH:'',//票据选择
        SUPPLIER_ID_SEARCH:'',//供应商选择
        columns:[[
            {type:'numbers',fixed: 'left'}
            ,{field:'CONTRACT_NO',title: '合同编号',width:140}
            ,{field:'CONTRACT_NAME',title: '合同名称',width:140}
            ,{field:'BUYER_NAME',title: '买方',width:120}
            ,{field:'PROJECT_NAME',title: '项目名称',width:200}
            ,{field:'SUPPLIER_NAME',title: '供应商',width:200}
            ,{field:'CONTRACT_PRICE',title: '合同金额',width:120}
            ,{field:'PAYMENT_MODE',title: '付款方式',width:120}
            ,{field:'BILL_TYPE_NAME',title: '票据类型',width:120}
            ,{field:'CONTRACT_DATE',title: '合同日期',width:140}
            ,{field:'MEMO',title: '备注',width:100}
            ,{field:'CONTRACT_ID', title: '操作', align:'center', toolbar: '#barDemo',width:300,fixed:'right'}
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
                        METHOD:'buyContract_list'
                    }
                    ,id: 'layListReload'
                    ,cols:vm.columns
                    ,page:true
                    ,limit:20
                    ,height:'auto'
                });
                //监听工具条
                table.on('tool(layList)', function(obj){
                    var data = obj.data;
                    if(obj.event === 'detail'){
                        vm.view(data.CONTRACT_ID);
                    } else if(obj.event === 'del'){
                        vm.delete(data.CONTRACT_ID);
                    } else if(obj.event === 'edit'){
                        vm.edit(data.CONTRACT_ID);
                    } else if(obj.event === 'close'){
                        vm.close(data.CONTRACT_ID);
                    }
                });

                var $ = layui.$, active = {
                    reload: function(){
                        var CONTRACT_NO_SEARCH = $('#CONTRACT_NO_SEARCH').val();
                        var CONTRACT_DATE_SEARCH = $('#CONTRACT_DATE_SEARCH').val();
                        var CONTRACT_NAME_SEARCH = $('#CONTRACT_NAME_SEARCH').val();
                        var BUYER_NAME_SEARCH = $('#BUYER_NAME_SEARCH').val();
                        var PROJECT_ID_SEARCH = $('#PROJECT_ID_SEARCH').val();
                        var SUPPLIER_ID_SEARCH = $('#SUPPLIER_ID_SEARCH').val();
                        var BILL_TYPE_SEARCH = $('#BILL_TYPE_SEARCH').val();
                        //执行重载
                        table.reload('layListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                            ,where: {
                                CONTRACT_NO_SEARCH: CONTRACT_NO_SEARCH,
                                CONTRACT_DATE_SEARCH:CONTRACT_DATE_SEARCH,
                                CONTRACT_NAME_SEARCH:CONTRACT_NAME_SEARCH,
                                BUYER_NAME_SEARCH:BUYER_NAME_SEARCH,
                                PROJECT_ID_SEARCH:PROJECT_ID_SEARCH,
                                SUPPLIER_ID_SEARCH:SUPPLIER_ID_SEARCH,
                                BILL_TYPE_SEARCH:BILL_TYPE_SEARCH
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
            openBootStrapDialog("","buy/materialBuy/contract_entry?type=save","1");
        },
        edit:function(CONTRACT_ID){
            openBootStrapDialog("","buy/materialBuy/contract_entry?type=edit&CONTRACT_ID="+CONTRACT_ID,"1");
        },
        view:function(CONTRACT_ID){
            openBootStrapDialog("","buy/materialBuy/contract_entry?type=view&CONTRACT_ID="+CONTRACT_ID,"1");
        },

        delete:function(CONTRACT_ID){
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
                myjstools.ajax(false, "POST", "/web/service?METHOD=buyContract_delete",{
                    CONTRACT_ID:CONTRACT_ID
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
            elem: '#CONTRACT_DATE_SEARCH' //指定元素
        });
    });
});